import { Injectable } from '@nestjs/common';

import { PrismaClientService } from '@project/blog-models';
import type { Post, Tag } from '@project/core';
import { PostSorting, PostState, PostType } from '@project/core';
import { BasePostgresRepository } from '@project/data-access';

import { PostEntity } from './post.entity';
import { PostFactory } from './post.factory';

const POST_INCLUDE_TAGS = {
  tags: true,
} as const;

export type PostListParams = {
  page: number;
  limit: number;
  authorId?: string;
  type?: PostType;
  tag?: string;
  sort: PostSorting;
  state: PostState;
};

export type PostListResult = {
  entities: PostEntity[];
  total: number;
};

@Injectable()
export class PostRepository extends BasePostgresRepository<
  PostEntity,
  Post,
  PrismaClientService
> {
  constructor(entityFactory: PostFactory, client: PrismaClientService) {
    super(entityFactory, client);
  }

  public override async findById(
    id: PostEntity['id'],
  ): Promise<PostEntity | null> {
    const document = await this.client.post.findUnique({
      where: { id },
      include: POST_INCLUDE_TAGS,
    });

    return this.toPostEntity(document);
  }

  public async find(params: PostListParams): Promise<PostListResult> {
    const { page, limit, authorId, type, tag, sort, state } = params;
    const where = {
      state,
      ...(authorId ? { authorId } : {}),
      ...(type ? { type } : {}),
      ...(tag ? { tags: { some: { name: tag } } } : {}),
    };

    const [documents, total] = await Promise.all([
      this.client.post.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: this.getOrderBy(sort),
        include: POST_INCLUDE_TAGS,
      }),
      this.client.post.count({ where }),
    ]);

    return {
      entities: documents
        .map((document) => this.toPostEntity(document))
        .filter((entity): entity is PostEntity => entity !== null),
      total,
    };
  }

  public override async save(entity: PostEntity): Promise<PostEntity> {
    const pojo = entity.toPOJO();
    const document = await this.client.post.create({
      data: {
        ...(pojo.id ? { id: pojo.id } : {}),
        ...this.getPostScalarData(pojo),
        tags: {
          connectOrCreate: this.getTagConnectOrCreate(pojo.tags),
        },
      },
      include: POST_INCLUDE_TAGS,
    });

    const savedEntity = this.toPostEntity(document);

    if (!savedEntity) {
      throw new Error('Post was not created');
    }

    return savedEntity;
  }

  public override async update(entity: PostEntity): Promise<PostEntity> {
    const pojo = entity.toPOJO();
    const document = await this.client.post.update({
      where: { id: entity.id },
      data: {
        ...this.getPostScalarData(pojo),
        tags: {
          set: [],
          connectOrCreate: this.getTagConnectOrCreate(pojo.tags),
        },
      },
      include: POST_INCLUDE_TAGS,
    });

    const updatedEntity = this.toPostEntity(document);

    if (!updatedEntity) {
      throw new Error(`Post with id ${entity.id} was not updated`);
    }

    return updatedEntity;
  }

  public override async deleteById(id: PostEntity['id']): Promise<void> {
    await this.client.post.delete({
      where: { id },
    });
  }

  private getOrderBy(sort: PostSorting) {
    switch (sort) {
      case PostSorting.ByLikes:
        return { likesCount: 'desc' as const };
      case PostSorting.ByComments:
        return { commentsCount: 'desc' as const };
      case PostSorting.ByPublishDate:
      default:
        return { publishedAt: 'desc' as const };
    }
  }

  private toPostEntity(document: unknown): PostEntity | null {
    return this.createEntityFromDocument(document as Post);
  }

  private getPostScalarData(post: Post) {
    const base = {
      type: post.type,
      state: post.state,
      authorId: post.authorId,
      createdAt: post.createdAt,
      publishedAt: post.publishedAt,
      isRepost: post.isRepost,
      originalAuthorId: post.originalAuthorId ?? null,
      originalPostId: post.originalPostId ?? null,
      likesCount: post.likesCount,
      commentsCount: post.commentsCount,
      title: null,
      announce: null,
      text: null,
      videoUrl: null,
      photoId: null,
      url: null,
      description: null,
      quoteAuthor: null,
    };

    switch (post.type) {
      case PostType.Video:
        return { ...base, title: post.title, videoUrl: post.videoUrl };
      case PostType.Text:
        return {
          ...base,
          title: post.title,
          announce: post.announce,
          text: post.text,
        };
      case PostType.Quote:
        return {
          ...base,
          text: post.text,
          quoteAuthor: post.quoteAuthor,
        };
      case PostType.Photo:
        return { ...base, photoId: post.photoId };
      case PostType.Link:
        return {
          ...base,
          url: post.url,
          description: post.description ?? null,
        };
      default: {
        const exhaustive: never = post;
        throw new Error(`Unknown post type: ${exhaustive}`);
      }
    }
  }

  private getTagConnectOrCreate(tags: Tag[]) {
    return tags.map((tag) => ({
      where: { name: tag.name },
      create: {
        ...(tag.id ? { id: tag.id } : {}),
        name: tag.name,
      },
    }));
  }
}
