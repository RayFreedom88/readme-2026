import { Injectable } from '@nestjs/common';

import { PrismaClientService } from '@project/blog-models';
import type { Comment } from '@project/core';
import { BasePostgresRepository } from '@project/data-access';

import { CommentEntity } from './comment.entity';
import { CommentFactory } from './comment.factory';

export type CommentListParams = {
  postId: string;
  page: number;
  limit: number;
};

export type CommentListResult = {
  entities: CommentEntity[];
  total: number;
};

@Injectable()
export class CommentRepository extends BasePostgresRepository<
  CommentEntity,
  Comment,
  PrismaClientService
> {
  constructor(entityFactory: CommentFactory, client: PrismaClientService) {
    super(entityFactory, client);
  }

  public override async findById(
    id: CommentEntity['id'],
  ): Promise<CommentEntity | null> {
    const document = await this.client.comment.findUnique({
      where: { id },
    });

    return this.toCommentEntity(document);
  }

  public async findByPostId(
    params: CommentListParams,
  ): Promise<CommentListResult> {
    const { postId, page, limit } = params;
    const where = { postId };

    const [documents, total] = await Promise.all([
      this.client.comment.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.client.comment.count({ where }),
    ]);

    return {
      entities: documents
        .map((document) => this.toCommentEntity(document))
        .filter((entity): entity is CommentEntity => entity !== null),
      total,
    };
  }

  public override async save(entity: CommentEntity): Promise<CommentEntity> {
    const pojo = entity.toPOJO();
    const [document] = await this.client.$transaction([
      this.client.comment.create({
        data: {
          ...(pojo.id ? { id: pojo.id } : {}),
          text: pojo.text,
          authorId: pojo.authorId,
          createdAt: pojo.createdAt,
          postId: pojo.postId,
        },
      }),
      this.client.post.update({
        where: { id: pojo.postId },
        data: { commentsCount: { increment: 1 } },
      }),
    ]);

    const savedEntity = this.toCommentEntity(document);

    if (!savedEntity) {
      throw new Error('Comment was not created');
    }

    return savedEntity;
  }

  public async deleteWithCounter(entity: CommentEntity): Promise<void> {
    await this.client.$transaction([
      this.client.comment.delete({
        where: { id: entity.id },
      }),
      this.client.post.update({
        where: { id: entity.postId },
        data: { commentsCount: { decrement: 1 } },
      }),
    ]);
  }

  private toCommentEntity(document: unknown): CommentEntity | null {
    if (!document) {
      return null;
    }

    return this.createEntityFromDocument(document as Comment);
  }
}
