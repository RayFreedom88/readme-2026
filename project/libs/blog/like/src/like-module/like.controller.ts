import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

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
    @Param('postId', ParseUUIDPipe) postId: string,
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
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: LikeResponseDescription.PostNotFound,
  })
  @Get()
  public async index(@Param('postId', ParseUUIDPipe) postId: string) {
    const likes = await this.likeService.findByPostId(postId);

    return fillDto(
      LikeRdo,
      likes.map((like) => like.toPOJO()),
    );
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: LikeResponseDescription.LikeDeleted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: LikeResponseDescription.LikeNotFound,
  })
  @ApiQuery({
    name: 'userId',
    required: true,
    type: String,
    description: 'Temporary until API Gateway identity is wired',
  })
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query('userId') userId: string,
  ) {
    await this.likeService.delete(postId, userId);
  }
}
