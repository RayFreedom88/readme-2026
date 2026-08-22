import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PostState } from '@project/core';
import { PostRepository } from '@project/post';

import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';

import {
  CommentExceptionMessage,
  CommentPagination,
} from '../comment.constant';
import { CommentQuery } from '../dto/comment-query.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository,
  ) {}

  public async create(
    postId: string,
    dto: CreateCommentDto,
  ): Promise<CommentEntity> {
    await this.ensurePublishedPost(postId);

    const commentEntity = new CommentEntity({
      postId,
      authorId: dto.authorId,
      text: dto.text,
      createdAt: new Date(),
    });

    return this.commentRepository.save(commentEntity);
  }

  public async findByPostId(postId: string, query: CommentQuery) {
    await this.ensurePublishedPost(postId);

    return this.commentRepository.findByPostId({
      postId,
      page: query.page ?? CommentPagination.DefaultPage,
      limit: query.limit ?? CommentPagination.DefaultLimit,
    });
  }

  public async delete(
    postId: string,
    commentId: string,
    authorId: string,
  ): Promise<void> {
    // TODO: replace authorId with the verified identity from API Gateway.
    if (!authorId) {
      throw new BadRequestException(CommentExceptionMessage.AuthorRequired);
    }

    const comment = await this.commentRepository.findById(commentId);

    if (!comment || comment.postId !== postId) {
      throw new NotFoundException(CommentExceptionMessage.NotFound);
    }

    if (comment.authorId !== authorId) {
      throw new ForbiddenException(CommentExceptionMessage.Forbidden);
    }

    await this.commentRepository.deleteWithCounter(comment);
  }

  private async ensurePublishedPost(postId: string): Promise<void> {
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new NotFoundException(CommentExceptionMessage.PostNotFound);
    }

    if (post.state !== PostState.Published) {
      throw new BadRequestException(CommentExceptionMessage.PostNotPublished);
    }
  }
}
