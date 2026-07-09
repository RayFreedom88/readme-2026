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

import { ApiRoute } from '@project/core';
import { fillDto } from '@project/helpers';

import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentRdo } from '../rdo/comment.rdo';
import { CommentService } from './comment.service';

// TODO: добавить @ApiTags('comments') и декораторы @ApiOperation/@ApiResponse для OpenAPI-документации
@Controller(ApiRoute.Comment.Root)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  public async create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
  ) {
    const comment = await this.commentService.create(postId, dto);

    return fillDto(CommentRdo, comment.toPOJO());
  }

  @Get()
  public async index(@Param('postId') postId: string) {
    const comments = await this.commentService.findByPostId(postId);

    return fillDto(
      CommentRdo,
      comments.map((comment) => comment.toPOJO()),
    );
  }

  @Delete(ApiRoute.Comment.Id)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ) {
    await this.commentService.delete(postId, commentId);
  }
}
