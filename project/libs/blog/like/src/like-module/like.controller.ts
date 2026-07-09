import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ApiRoute } from '@project/core';
import { fillDto } from '@project/helpers';

import { CreateLikeDto } from '../dto/create-like.dto';
import { LikeRdo } from '../rdo/like.rdo';
import { LikeService } from './like.service';

// TODO: добавить @ApiTags('likes') и декораторы @ApiOperation/@ApiResponse для OpenAPI-документации
@Controller(ApiRoute.Like.Root)
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  public async create(
    @Param('postId') postId: string,
    @Body() dto: CreateLikeDto,
  ) {
    const like = await this.likeService.create(postId, dto);

    return fillDto(LikeRdo, like.toPOJO());
  }

  @Get()
  public async index(@Param('postId') postId: string) {
    const likes = await this.likeService.findByPostId(postId);

    return fillDto(
      LikeRdo,
      likes.map((like) => like.toPOJO()),
    );
  }
}
