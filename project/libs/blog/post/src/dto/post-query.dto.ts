import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { PostSorting, PostType } from '@project/core';

import {
  DEFAULT_POST_LIMIT,
  DEFAULT_POST_PAGE,
  MAX_POST_LIMIT,
  PostPropertyDescription,
} from '../post.constant';

export class PostQuery {
  @ApiPropertyOptional({
    description: PostPropertyDescription.Page,
    example: DEFAULT_POST_PAGE,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public page: number = DEFAULT_POST_PAGE;

  @ApiPropertyOptional({
    description: PostPropertyDescription.Limit,
    example: DEFAULT_POST_LIMIT,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(MAX_POST_LIMIT)
  public limit: number = DEFAULT_POST_LIMIT;

  @ApiPropertyOptional({
    description: PostPropertyDescription.AuthorId,
    example: '658170cbb954e9f5b905ccf4',
  })
  @IsOptional()
  @IsString()
  public authorId?: string;

  @ApiPropertyOptional({
    description: PostPropertyDescription.Type,
    enum: PostType,
    example: PostType.Text,
  })
  @IsOptional()
  @IsEnum(PostType)
  public type?: PostType;

  @ApiPropertyOptional({
    description: PostPropertyDescription.Tag,
    example: 'books',
  })
  @IsOptional()
  @IsString()
  public tag?: string;

  @ApiPropertyOptional({
    description: PostPropertyDescription.Sort,
    enum: PostSorting,
    example: PostSorting.ByPublishDate,
  })
  @IsOptional()
  @IsEnum(PostSorting)
  public sort: PostSorting = PostSorting.ByPublishDate;
}
