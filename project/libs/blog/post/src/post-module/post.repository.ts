import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@project/data-access';

import { PostEntity } from './post.entity';
import { PostFactory } from './post.factory';

@Injectable()
export class PostRepository extends BaseMemoryRepository<PostEntity> {
  constructor(entityFactory: PostFactory) {
    super(entityFactory);
  }

  public async findAll(): Promise<PostEntity[]> {
    const entities = Array.from(this.entities.values());

    return entities.map((entity) => this.entityFactory.create(entity));
  }
}
