import { Injectable } from '@nestjs/common';

import { PrismaClientService } from '@project/blog-models';
import type { Like } from '@project/core';
import { BasePostgresRepository } from '@project/data-access';

import { LikeEntity } from './like.entity';
import { LikeFactory } from './like.factory';

@Injectable()
export class LikeRepository extends BasePostgresRepository<
  LikeEntity,
  Like,
  PrismaClientService
> {
  constructor(entityFactory: LikeFactory, client: PrismaClientService) {
    super(entityFactory, client);
  }

  public override async findById(
    id: LikeEntity['id'],
  ): Promise<LikeEntity | null> {
    const document = await this.client.like.findUnique({
      where: { id },
    });

    return this.toLikeEntity(document);
  }

  public async findByPostId(postId: string): Promise<LikeEntity[]> {
    const documents = await this.client.like.findMany({
      where: { postId },
      orderBy: { createdAt: 'desc' },
    });

    return documents
      .map((document) => this.toLikeEntity(document))
      .filter((entity): entity is LikeEntity => entity !== null);
  }

  public async findByPostAndUser(
    postId: string,
    userId: string,
  ): Promise<LikeEntity | null> {
    const document = await this.client.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    return this.toLikeEntity(document);
  }

  public override async save(entity: LikeEntity): Promise<LikeEntity> {
    const pojo = entity.toPOJO();
    const [document] = await this.client.$transaction([
      this.client.like.create({
        data: {
          ...(pojo.id ? { id: pojo.id } : {}),
          userId: pojo.userId,
          createdAt: pojo.createdAt,
          postId: pojo.postId,
        },
      }),
      this.client.post.update({
        where: { id: pojo.postId },
        data: { likesCount: { increment: 1 } },
      }),
    ]);

    const savedEntity = this.toLikeEntity(document);

    if (!savedEntity) {
      throw new Error('Like was not created');
    }

    return savedEntity;
  }

  public async deleteWithCounter(entity: LikeEntity): Promise<void> {
    await this.client.$transaction([
      this.client.like.delete({
        where: { id: entity.id },
      }),
      this.client.post.update({
        where: { id: entity.postId },
        data: { likesCount: { decrement: 1 } },
      }),
    ]);
  }

  private toLikeEntity(document: unknown): LikeEntity | null {
    if (!document) {
      return null;
    }

    return this.createEntityFromDocument(document as Like);
  }
}
