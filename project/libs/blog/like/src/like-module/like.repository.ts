import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@project/data-access';

import { LikeEntity } from './like.entity';
import { LikeFactory } from './like.factory';

@Injectable()
export class LikeRepository extends BaseMemoryRepository<LikeEntity> {
  constructor(entityFactory: LikeFactory) {
    super(entityFactory);
  }

  public async findByPostId(postId: string): Promise<LikeEntity[]> {
    const entities = Array.from(this.entities.values());
    const likes = entities.filter((entity) => entity.postId === postId);

    return likes.map((entity) => this.entityFactory.create(entity));
  }

  public async findByPostAndUser(
    postId: string,
    userId: string,
  ): Promise<LikeEntity | null> {
    const entities = Array.from(this.entities.values());
    const like = entities.find(
      (entity) => entity.postId === postId && entity.userId === userId,
    );

    if (!like) {
      return null;
    }

    return this.entityFactory.create(like);
  }
}
