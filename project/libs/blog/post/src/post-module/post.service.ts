import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Post, Tag } from '@project/core';
import { PostSorting, PostState, PostType } from '@project/core';

import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';

import { type CreatePostDto } from '../dto/create-post.dto';
import { PostQuery } from '../dto/post-query.dto';
import {
  UPDATE_POST_DTO_BY_TYPE,
  type UpdatePostDto,
} from '../dto/update-post.dto';
import { validateDto } from '../dto/validate-dto';
import {
  DEFAULT_POST_LIMIT,
  DEFAULT_POST_PAGE,
  PostExceptionMessage,
  TAG_PATTERN,
} from '../post.constant';

const PRISMA_UNIQUE_VIOLATION = 'P2002';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async create(dto: CreatePostDto): Promise<PostEntity> {
    const postEntity = new PostEntity(this.toPost(dto));
    return this.postRepository.save(postEntity);
  }

  public async find(query: PostQuery) {
    return this.postRepository.find({
      page: query.page ?? DEFAULT_POST_PAGE,
      limit: query.limit ?? DEFAULT_POST_LIMIT,
      authorId: query.authorId,
      type: query.type,
      tag: query.tag?.trim().toLowerCase(),
      sort: query.sort ?? PostSorting.ByPublishDate,
      state: PostState.Published,
    });
  }

  public async findDrafts(authorId: string, query: PostQuery) {
    // TODO: replace authorId with the verified identity from API Gateway.
    this.ensureAuthorId(authorId);

    return this.postRepository.find({
      page: query.page ?? DEFAULT_POST_PAGE,
      limit: query.limit ?? DEFAULT_POST_LIMIT,
      authorId,
      type: query.type,
      tag: query.tag?.trim().toLowerCase(),
      sort: query.sort ?? PostSorting.ByPublishDate,
      state: PostState.Draft,
    });
  }

  public async findById(id: string): Promise<PostEntity> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new NotFoundException(PostExceptionMessage.NotFound);
    }

    return post;
  }

  public async getById(id: string, authorId?: string): Promise<PostEntity> {
    const post = await this.findById(id);

    if (post.state === PostState.Draft) {
      // TODO: replace authorId with the verified identity from API Gateway.
      if (!authorId || post.authorId !== authorId) {
        throw new NotFoundException(PostExceptionMessage.NotFound);
      }
    }

    return post;
  }

  public async update(
    id: string,
    payload: unknown,
    authorId: string,
  ): Promise<PostEntity> {
    // TODO: replace authorId with the verified identity from API Gateway.
    this.ensureAuthorId(authorId);
    const post = await this.findById(id);
    this.ensureAuthor(post, authorId);

    const DtoClass = UPDATE_POST_DTO_BY_TYPE[post.type];
    const dto = await validateDto(DtoClass as new () => UpdatePostDto, payload);
    this.applyUpdate(post, dto);

    return this.postRepository.update(post);
  }

  public async delete(id: string, authorId: string): Promise<void> {
    // TODO: replace authorId with the verified identity from API Gateway.
    this.ensureAuthorId(authorId);
    const post = await this.findById(id);
    this.ensureAuthor(post, authorId);

    await this.postRepository.deleteById(id);
  }

  public async repost(id: string, authorId: string): Promise<PostEntity> {
    // TODO: replace authorId with the verified identity from API Gateway.
    this.ensureAuthorId(authorId);
    const original = await this.findById(id);

    if (original.state !== PostState.Published) {
      throw new BadRequestException(PostExceptionMessage.CannotRepostDraft);
    }

    if (original.authorId === authorId) {
      throw new BadRequestException(PostExceptionMessage.CannotRepostOwn);
    }

    if (original.isRepost) {
      throw new BadRequestException(PostExceptionMessage.CannotRepostRepost);
    }

    const originalPojo = original.toPOJO();
    const now = new Date();
    const repostEntity = new PostEntity({
      ...originalPojo,
      id: undefined,
      authorId,
      isRepost: true,
      originalAuthorId: original.authorId,
      originalPostId: original.id,
      likesCount: 0,
      commentsCount: 0,
      createdAt: now,
      publishedAt: now,
      state: PostState.Published,
    });

    try {
      return await this.postRepository.save(repostEntity);
    } catch (error: unknown) {
      if (this.isPrismaCode(error, PRISMA_UNIQUE_VIOLATION)) {
        throw new ConflictException(PostExceptionMessage.AlreadyReposted);
      }

      throw error;
    }
  }

  private toPost(dto: CreatePostDto): Post {
    const tags = this.normalizeTags(dto.tags);
    const now = new Date();
    const base = {
      state: PostState.Published,
      authorId: dto.authorId,
      tags,
      publishedAt: now,
      isRepost: false,
      likesCount: 0,
      commentsCount: 0,
      createdAt: now,
    };

    switch (dto.type) {
      case PostType.Video:
        return {
          ...base,
          type: PostType.Video,
          title: dto.title,
          videoUrl: dto.videoUrl,
        };
      case PostType.Text:
        return {
          ...base,
          type: PostType.Text,
          title: dto.title,
          announce: dto.announce,
          text: dto.text,
        };
      case PostType.Quote:
        return {
          ...base,
          type: PostType.Quote,
          text: dto.text,
          quoteAuthor: dto.quoteAuthor,
        };
      case PostType.Photo:
        return {
          ...base,
          type: PostType.Photo,
          photoId: dto.photoId,
        };
      case PostType.Link:
        return {
          ...base,
          type: PostType.Link,
          url: dto.url,
          description: dto.description,
        };
      default: {
        const exhaustive: never = dto;
        throw new Error(`Unknown post type: ${exhaustive}`);
      }
    }
  }

  private applyUpdate(post: PostEntity, dto: UpdatePostDto): void {
    if (dto.state !== undefined) {
      post.state = dto.state;
    }

    if (dto.publishedAt !== undefined) {
      post.publishedAt = dto.publishedAt;
    }

    if (dto.tags !== undefined) {
      post.tags = this.normalizeTags(dto.tags);
    }

    if ('title' in dto && dto.title !== undefined) {
      post.title = dto.title;
    }

    if ('announce' in dto && dto.announce !== undefined) {
      post.announce = dto.announce;
    }

    if ('text' in dto && dto.text !== undefined) {
      post.text = dto.text;
    }

    if ('videoUrl' in dto && dto.videoUrl !== undefined) {
      post.videoUrl = dto.videoUrl;
    }

    if ('photoId' in dto && dto.photoId !== undefined) {
      post.photoId = dto.photoId;
    }

    if ('url' in dto && dto.url !== undefined) {
      post.url = dto.url;
    }

    if ('description' in dto && dto.description !== undefined) {
      post.description = dto.description;
    }

    if ('quoteAuthor' in dto && dto.quoteAuthor !== undefined) {
      post.quoteAuthor = dto.quoteAuthor;
    }
  }

  private normalizeTags(tags?: string[]): Tag[] {
    const normalized = [
      ...new Set(
        (tags ?? [])
          .map((tag) => tag.trim().toLowerCase())
          .filter((tag) => TAG_PATTERN.test(tag)),
      ),
    ];

    return normalized.map((name) => ({ name }));
  }

  private ensureAuthorId(authorId: string): void {
    if (!authorId) {
      throw new BadRequestException(PostExceptionMessage.AuthorRequired);
    }
  }

  private ensureAuthor(post: PostEntity, authorId: string): void {
    if (post.authorId !== authorId) {
      throw new ForbiddenException(PostExceptionMessage.Forbidden);
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
