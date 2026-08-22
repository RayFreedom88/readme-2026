import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Length,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { PostState, PostType } from '@project/core';

import { PostTagsDto } from './post-tags.dto';

import {
  PostAnnounceLength,
  PostDescriptionLength,
  PostPropertyDescription,
  PostQuoteAuthorLength,
  PostQuoteTextLength,
  PostTextLength,
  PostTitleLength,
  YOUTUBE_HOST_WHITELIST,
} from '../post.constant';

export class UpdatePostBaseDto extends PostTagsDto {
  @ApiPropertyOptional({
    description: PostPropertyDescription.State,
    enum: PostState,
    example: PostState.Published,
  })
  @IsOptional()
  @IsEnum(PostState)
  public state?: PostState;

  @ApiPropertyOptional({
    description: PostPropertyDescription.PublishedAt,
    example: '1999-03-31T00:00:00.000Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public publishedAt?: Date;
}

export class UpdateVideoPostDto extends UpdatePostBaseDto {
  @ApiPropertyOptional({
    description: PostPropertyDescription.Title,
    example: 'Hello Neo from Zion city',
  })
  @IsOptional()
  @IsString()
  @Length(PostTitleLength.Min, PostTitleLength.Max)
  public title?: string;

  @ApiPropertyOptional({
    description: PostPropertyDescription.VideoUrl,
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  })
  @IsOptional()
  @IsUrl({
    require_protocol: true,
    protocols: ['http', 'https'],
    host_whitelist: [...YOUTUBE_HOST_WHITELIST],
  })
  public videoUrl?: string;
}

export class UpdateTextPostDto extends UpdatePostBaseDto {
  @ApiPropertyOptional({
    description: PostPropertyDescription.Title,
    example: 'Hello Neo from Zion city',
  })
  @IsOptional()
  @IsString()
  @Length(PostTitleLength.Min, PostTitleLength.Max)
  public title?: string;

  @ApiPropertyOptional({
    description: PostPropertyDescription.Announce,
    example: 'Follow the white rabbit through the matrix of our world today.',
  })
  @IsOptional()
  @IsString()
  @Length(PostAnnounceLength.Min, PostAnnounceLength.Max)
  public announce?: string;

  @ApiPropertyOptional({
    description: PostPropertyDescription.Text,
    example:
      'There is no spoon. The matrix is a system, Neo. That system is our enemy and we must understand it.',
  })
  @IsOptional()
  @IsString()
  @Length(PostTextLength.Min, PostTextLength.Max)
  public text?: string;
}

export class UpdateQuotePostDto extends UpdatePostBaseDto {
  @ApiPropertyOptional({
    description: PostPropertyDescription.Text,
    example: 'There is no spoon. The matrix is a system we must understand.',
  })
  @IsOptional()
  @IsString()
  @Length(PostQuoteTextLength.Min, PostQuoteTextLength.Max)
  public text?: string;

  @ApiPropertyOptional({
    description: PostPropertyDescription.QuoteAuthor,
    example: 'Morpheus',
  })
  @IsOptional()
  @IsString()
  @Length(PostQuoteAuthorLength.Min, PostQuoteAuthorLength.Max)
  public quoteAuthor?: string;
}

export class UpdatePhotoPostDto extends UpdatePostBaseDto {
  @ApiPropertyOptional({
    description: PostPropertyDescription.PhotoId,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  public photoId?: string;
}

export class UpdateLinkPostDto extends UpdatePostBaseDto {
  @ApiPropertyOptional({
    description: PostPropertyDescription.Url,
    example: 'https://example.com',
  })
  @IsOptional()
  @IsUrl({ require_protocol: true, protocols: ['http', 'https'] })
  public url?: string;

  @ApiPropertyOptional({
    description: PostPropertyDescription.Description,
    example: 'Useful link',
  })
  @IsOptional()
  @IsString()
  @Length(0, PostDescriptionLength.Max)
  public description?: string;
}

export type UpdatePostDto =
  | UpdateVideoPostDto
  | UpdateTextPostDto
  | UpdateQuotePostDto
  | UpdatePhotoPostDto
  | UpdateLinkPostDto;

export const UPDATE_POST_DTO_BY_TYPE = {
  [PostType.Video]: UpdateVideoPostDto,
  [PostType.Text]: UpdateTextPostDto,
  [PostType.Quote]: UpdateQuotePostDto,
  [PostType.Photo]: UpdatePhotoPostDto,
  [PostType.Link]: UpdateLinkPostDto,
} as const;
