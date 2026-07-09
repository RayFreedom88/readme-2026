import { Body, Controller, Get, Param, Post as HttpPost } from '@nestjs/common';

import { ApiRoute } from '@project/core';
import { fillDto } from '@project/helpers';

import { CreatePostDto } from '../dto/create-post.dto';
import { PostRdo } from '../rdo/post.rdo';
import { PostService } from './post.service';

// TODO: добавить @ApiTags('posts') и декораторы @ApiOperation/@ApiResponse для OpenAPI-документации
@Controller(ApiRoute.Post.Root)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpPost()
  public async create(@Body() dto: CreatePostDto) {
    const post = await this.postService.create(dto);

    return fillDto(PostRdo, post.toPOJO());
  }

  @Get()
  public async index() {
    const posts = await this.postService.findAll();

    return fillDto(
      PostRdo,
      posts.map((post) => post.toPOJO()),
    );
  }

  @Get(ApiRoute.Post.Id)
  public async show(@Param('id') id: string) {
    const post = await this.postService.findById(id);

    return fillDto(PostRdo, post.toPOJO());
  }
}
