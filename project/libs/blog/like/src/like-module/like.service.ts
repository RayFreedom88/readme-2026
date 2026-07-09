import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PostRepository } from '@project/post';

import { CreateLikeDto } from '../dto/create-like.dto';
import { LikeExceptionMessage } from './like.constant';
import { LikeEntity } from './like.entity';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly postRepository: PostRepository,
  ) {}

  public async create(postId: string, dto: CreateLikeDto): Promise<LikeEntity> {
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new NotFoundException(LikeExceptionMessage.PostNotFound);
    }

    const existLike = await this.likeRepository.findByPostAndUser(
      postId,
      dto.userId,
    );

    if (existLike) {
      throw new ConflictException(LikeExceptionMessage.AlreadyLiked);
    }

    const likeEntity = new LikeEntity({
      postId,
      userId: dto.userId,
      createdAt: new Date(),
    });

    return this.likeRepository.save(likeEntity);
  }

  public async findByPostId(postId: string): Promise<LikeEntity[]> {
    return this.likeRepository.findByPostId(postId);
  }
}
