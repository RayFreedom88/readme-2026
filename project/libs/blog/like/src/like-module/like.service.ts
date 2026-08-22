import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PostState } from '@project/core';
import { PostRepository } from '@project/post';

import { LikeEntity } from './like.entity';
import { LikeRepository } from './like.repository';

import { CreateLikeDto } from '../dto/create-like.dto';
import { LikeExceptionMessage } from '../like.constant';

const PRISMA_UNIQUE_VIOLATION = 'P2002';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly postRepository: PostRepository,
  ) {}

  public async create(postId: string, dto: CreateLikeDto): Promise<LikeEntity> {
    await this.ensurePublishedPost(postId);

    const likeEntity = new LikeEntity({
      postId,
      userId: dto.userId,
      createdAt: new Date(),
    });

    try {
      return await this.likeRepository.save(likeEntity);
    } catch (error: unknown) {
      if (this.isPrismaCode(error, PRISMA_UNIQUE_VIOLATION)) {
        throw new ConflictException(LikeExceptionMessage.AlreadyLiked);
      }

      throw error;
    }
  }

  public async findByPostId(postId: string): Promise<LikeEntity[]> {
    await this.ensurePublishedPost(postId);

    return this.likeRepository.findByPostId(postId);
  }

  public async delete(postId: string, userId: string): Promise<void> {
    // TODO: replace userId with the verified identity from API Gateway.
    if (!userId) {
      throw new BadRequestException(LikeExceptionMessage.UserRequired);
    }

    await this.ensurePublishedPost(postId);

    const like = await this.likeRepository.findByPostAndUser(postId, userId);

    if (!like) {
      throw new NotFoundException(LikeExceptionMessage.NotFound);
    }

    await this.likeRepository.deleteWithCounter(like);
  }

  private async ensurePublishedPost(postId: string): Promise<void> {
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new NotFoundException(LikeExceptionMessage.PostNotFound);
    }

    if (post.state !== PostState.Published) {
      throw new BadRequestException(LikeExceptionMessage.PostNotPublished);
    }
  }

  private isPrismaCode(error: unknown, code: string): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === code
    );
  }
}
