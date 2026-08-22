import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiRoute } from '@project/core';
import { fillDto } from '@project/helpers';

import { CommentService } from './comment.service';

import {
  COMMENT_TAG,
  CommentPagination,
  CommentResponseDescription,
} from '../comment.constant';
import { CommentQuery } from '../dto/comment-query.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentRdo } from '../rdo/comment.rdo';
import { CommentListRdo } from '../rdo/comment-list.rdo';

@ApiTags(COMMENT_TAG)
@Controller(ApiRoute.Comment.Root)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: CommentResponseDescription.CommentCreated,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentResponseDescription.PostNotFound,
  })
  @Post()
  public async create(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() dto: CreateCommentDto,
  ) {
    const comment = await this.commentService.create(postId, dto);

    return fillDto(CommentRdo, comment.toPOJO());
  }

  @ApiResponse({
    type: CommentListRdo,
    status: HttpStatus.OK,
    description: CommentResponseDescription.CommentsFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentResponseDescription.PostNotFound,
  })
  @Get()
  public async index(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query() query: CommentQuery,
  ) {
    const { entities, total } = await this.commentService.findByPostId(
      postId,
      query,
    );

    return fillDto(CommentListRdo, {
      items: fillDto(
        CommentRdo,
        entities.map((comment) => comment.toPOJO()),
      ),
      total,
      page: query.page ?? CommentPagination.DefaultPage,
      limit: query.limit ?? CommentPagination.DefaultLimit,
    });
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: CommentResponseDescription.CommentDeleted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentResponseDescription.CommentNotFound,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: CommentResponseDescription.CommentForbidden,
  })
  @ApiQuery({
    name: 'authorId',
    required: true,
    type: String,
    description: 'Temporary until API Gateway identity is wired',
  })
  @Delete(ApiRoute.Comment.Id)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Query('authorId') authorId: string,
  ) {
    await this.commentService.delete(postId, commentId, authorId);
  }
}
