import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post as HttpPost,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiRoute } from '@project/core';
import { fillDto } from '@project/helpers';

import { PostEntity } from './post.entity';
import { PostService } from './post.service';

import { CreatePostDto } from '../dto/create-post.dto';
import { POST_TAG, PostResponseDescription } from '../post.constant';
import { PostRdo } from '../rdo/post.rdo';

@ApiTags(POST_TAG)
@Controller(ApiRoute.Post.Root)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: PostResponseDescription.PostCreated,
  })
  @HttpPost()
  public async create(@Body() dto: CreatePostDto) {
    const post = await this.postService.create(dto);

    return fillDto(PostRdo, this.toPostRdo(post));
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    isArray: true,
    description: PostResponseDescription.PostsFound,
  })
  @Get()
  public async index() {
    const posts = await this.postService.findAll();

    return fillDto(
      PostRdo,
      posts.map((post) => this.toPostRdo(post)),
    );
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostResponseDescription.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseDescription.PostNotFound,
  })
  @Get(ApiRoute.Post.Id)
  public async show(@Param('id') id: string) {
    const post = await this.postService.findById(id);

    return fillDto(PostRdo, this.toPostRdo(post));
  }

  private toPostRdo(post: PostEntity) {
    return {
      ...post.toPOJO(),
      tags: post.tags.map((tag) => tag.name),
    };
  }
}
