import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post as HttpPost,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { ApiRoute, PostType } from '@project/core';
import { fillDto } from '@project/helpers';

import { CreatePostPipe } from './create-post.pipe';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

import {
  CreateLinkPostDto,
  CreatePhotoPostDto,
  type CreatePostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
} from '../dto/create-post.dto';
import { PostQuery } from '../dto/post-query.dto';
import {
  UpdateLinkPostDto,
  UpdatePhotoPostDto,
  UpdateQuotePostDto,
  UpdateTextPostDto,
  UpdateVideoPostDto,
} from '../dto/update-post.dto';
import {
  DEFAULT_POST_LIMIT,
  DEFAULT_POST_PAGE,
  POST_TAG,
  PostResponseDescription,
} from '../post.constant';
import { PostRdo } from '../rdo/post.rdo';
import { PostListRdo } from '../rdo/post-list.rdo';

@ApiTags(POST_TAG)
@ApiExtraModels(
  CreateVideoPostDto,
  CreateTextPostDto,
  CreateQuotePostDto,
  CreatePhotoPostDto,
  CreateLinkPostDto,
  UpdateVideoPostDto,
  UpdateTextPostDto,
  UpdateQuotePostDto,
  UpdatePhotoPostDto,
  UpdateLinkPostDto,
)
@Controller(ApiRoute.Post.Root)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: PostResponseDescription.PostCreated,
  })
  @ApiBody({
    schema: {
      oneOf: [
        { $ref: getSchemaPath(CreateVideoPostDto) },
        { $ref: getSchemaPath(CreateTextPostDto) },
        { $ref: getSchemaPath(CreateQuotePostDto) },
        { $ref: getSchemaPath(CreatePhotoPostDto) },
        { $ref: getSchemaPath(CreateLinkPostDto) },
      ],
      discriminator: {
        propertyName: 'type',
        mapping: {
          [PostType.Video]: getSchemaPath(CreateVideoPostDto),
          [PostType.Text]: getSchemaPath(CreateTextPostDto),
          [PostType.Quote]: getSchemaPath(CreateQuotePostDto),
          [PostType.Photo]: getSchemaPath(CreatePhotoPostDto),
          [PostType.Link]: getSchemaPath(CreateLinkPostDto),
        },
      },
    },
  })
  @HttpPost()
  public async create(@Body(CreatePostPipe) dto: CreatePostDto) {
    const post = await this.postService.create(dto);

    return fillDto(PostRdo, this.toPostRdo(post));
  }

  @ApiResponse({
    type: PostListRdo,
    status: HttpStatus.OK,
    description: PostResponseDescription.PostsFound,
  })
  @Get()
  public async index(@Query() query: PostQuery) {
    const { entities, total } = await this.postService.find(query);

    return this.toListRdo(entities, total, query);
  }

  @ApiResponse({
    type: PostListRdo,
    status: HttpStatus.OK,
    description: PostResponseDescription.PostsFound,
  })
  @ApiQuery({
    name: 'authorId',
    required: true,
    type: String,
    description: 'Temporary until API Gateway identity is wired',
  })
  @Get(ApiRoute.Post.Drafts)
  public async drafts(
    @Query('authorId') authorId: string,
    @Query() query: PostQuery,
  ) {
    const { entities, total } = await this.postService.findDrafts(
      authorId,
      query,
    );

    return this.toListRdo(entities, total, query);
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
  @ApiQuery({
    name: 'authorId',
    required: false,
    type: String,
    description:
      'Required to read a draft. Temporary until API Gateway identity is wired',
  })
  @Get(ApiRoute.Post.Id)
  public async show(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('authorId') authorId?: string,
  ) {
    const post = await this.postService.getById(id, authorId);

    return fillDto(PostRdo, this.toPostRdo(post));
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostResponseDescription.PostUpdated,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseDescription.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: PostResponseDescription.PostForbidden,
  })
  @ApiQuery({
    name: 'authorId',
    required: true,
    type: String,
    description: 'Temporary until API Gateway identity is wired',
  })
  @ApiBody({
    schema: {
      oneOf: [
        { $ref: getSchemaPath(UpdateVideoPostDto) },
        { $ref: getSchemaPath(UpdateTextPostDto) },
        { $ref: getSchemaPath(UpdateQuotePostDto) },
        { $ref: getSchemaPath(UpdatePhotoPostDto) },
        { $ref: getSchemaPath(UpdateLinkPostDto) },
      ],
    },
  })
  @Patch(ApiRoute.Post.Id)
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('authorId') authorId: string,
    @Body() dto: Record<string, unknown>,
  ) {
    const post = await this.postService.update(id, dto, authorId);

    return fillDto(PostRdo, this.toPostRdo(post));
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: PostResponseDescription.PostDeleted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseDescription.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: PostResponseDescription.PostForbidden,
  })
  @ApiQuery({
    name: 'authorId',
    required: true,
    type: String,
    description: 'Temporary until API Gateway identity is wired',
  })
  @Delete(ApiRoute.Post.Id)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('authorId') authorId: string,
  ) {
    await this.postService.delete(id, authorId);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: PostResponseDescription.PostReposted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseDescription.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: PostResponseDescription.PostConflict,
  })
  @ApiQuery({
    name: 'authorId',
    required: true,
    type: String,
    description: 'Temporary until API Gateway identity is wired',
  })
  @HttpPost(ApiRoute.Post.Repost)
  public async repost(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('authorId') authorId: string,
  ) {
    const post = await this.postService.repost(id, authorId);

    return fillDto(PostRdo, this.toPostRdo(post));
  }

  private toListRdo(posts: PostEntity[], total: number, query: PostQuery) {
    return fillDto(PostListRdo, {
      items: fillDto(
        PostRdo,
        posts.map((post) => this.toPostRdo(post)),
      ),
      total,
      page: query.page ?? DEFAULT_POST_PAGE,
      limit: query.limit ?? DEFAULT_POST_LIMIT,
    });
  }

  private toPostRdo(post: PostEntity) {
    return {
      ...post.toPOJO(),
      tags: post.tags.map((tag) => tag.name),
    };
  }
}
