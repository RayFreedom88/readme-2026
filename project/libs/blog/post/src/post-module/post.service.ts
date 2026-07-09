import { Injectable, NotFoundException } from '@nestjs/common';

import type { Post } from '@project/core';

import { CreatePostDto } from '../dto/create-post.dto';
import { PostExceptionMessage } from './post.constant';
import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async create(dto: CreatePostDto): Promise<PostEntity> {
    const postEntity = new PostEntity({
      ...dto,
      tags: dto.tags ?? [],
      isRepost: dto.isRepost ?? false,
      publishedAt: dto.publishedAt ?? new Date(),
      likesCount: 0,
      commentsCount: 0,
      createdAt: new Date(),
    } as Post);

    return this.postRepository.save(postEntity);
  }

  public async findAll(): Promise<PostEntity[]> {
    return this.postRepository.findAll();
  }

  public async findById(id: string): Promise<PostEntity> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new NotFoundException(PostExceptionMessage.NotFound);
    }

    return post;
  }
}
