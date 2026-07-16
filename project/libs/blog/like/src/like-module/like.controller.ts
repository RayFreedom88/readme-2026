import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiRoute } from '@project/core';
import { fillDto } from '@project/helpers';

import { LikeService } from './like.service';

import { CreateLikeDto } from '../dto/create-like.dto';
import { LIKE_TAG, LikeResponseDescription } from '../like.constant';
import { LikeRdo } from '../rdo/like.rdo';

@ApiTags(LIKE_TAG)
@Controller(ApiRoute.Like.Root)
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiResponse({
    type: LikeRdo,
    status: HttpStatus.CREATED,
    description: LikeResponseDescription.LikeCreated,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: LikeResponseDescription.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: LikeResponseDescription.AlreadyLiked,
  })
  @Post()
  public async create(
    @Param('postId') postId: string,
    @Body() dto: CreateLikeDto,
  ) {
    const like = await this.likeService.create(postId, dto);

    return fillDto(LikeRdo, like.toPOJO());
  }

  @ApiResponse({
    type: LikeRdo,
    status: HttpStatus.OK,
    isArray: true,
    description: LikeResponseDescription.LikesFound,
  })
  @Get()
  public async index(@Param('postId') postId: string) {
    const likes = await this.likeService.findByPostId(postId);

    return fillDto(
      LikeRdo,
      likes.map((like) => like.toPOJO()),
    );
  }
}
