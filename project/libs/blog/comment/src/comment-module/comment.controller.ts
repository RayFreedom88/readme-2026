import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiRoute } from '@project/core';
import { fillDto } from '@project/helpers';

import { CommentService } from './comment.service';

import { COMMENT_TAG, CommentResponseDescription } from '../comment.constant';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentRdo } from '../rdo/comment.rdo';

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
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
  ) {
    const comment = await this.commentService.create(postId, dto);

    return fillDto(CommentRdo, comment.toPOJO());
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    isArray: true,
    description: CommentResponseDescription.CommentsFound,
  })
  @Get()
  public async index(@Param('postId') postId: string) {
    const comments = await this.commentService.findByPostId(postId);

    return fillDto(
      CommentRdo,
      comments.map((comment) => comment.toPOJO()),
    );
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: CommentResponseDescription.CommentDeleted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentResponseDescription.CommentNotFound,
  })
  @Delete(ApiRoute.Comment.Id)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ) {
    await this.commentService.delete(postId, commentId);
  }
}
