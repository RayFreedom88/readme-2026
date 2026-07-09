import { Injectable, NotFoundException } from '@nestjs/common';

import { PostRepository } from '@project/post';

import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentExceptionMessage } from './comment.constant';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';

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
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new NotFoundException(CommentExceptionMessage.PostNotFound);
    }

    const commentEntity = new CommentEntity({
      postId,
      authorId: dto.authorId,
      text: dto.text,
      createdAt: new Date(),
    });

    return this.commentRepository.save(commentEntity);
  }

  public async findByPostId(postId: string): Promise<CommentEntity[]> {
    return this.commentRepository.findByPostId(postId);
  }

  public async delete(postId: string, commentId: string): Promise<void> {
    const comment = await this.commentRepository.findById(commentId);

    if (!comment || comment.postId !== postId) {
      throw new NotFoundException(CommentExceptionMessage.NotFound);
    }

    await this.commentRepository.deleteById(commentId);
  }
}
