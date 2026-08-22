import {
  Equals,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PostType } from '@project/core';

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

export class CreatePostBaseDto extends PostTagsDto {
  // TODO: replace authorId with the verified identity from API Gateway.
  @ApiProperty({
    description: PostPropertyDescription.AuthorId,
    example: '658170cbb954e9f5b905ccf4',
  })
  @IsString()
  @IsNotEmpty()
  public authorId!: string;
}

export class CreateVideoPostDto extends CreatePostBaseDto {
  @ApiProperty({
    description: PostPropertyDescription.Type,
    enum: PostType,
    example: PostType.Video,
  })
  @Equals(PostType.Video)
  public type!: PostType.Video;

  @ApiProperty({
    description: PostPropertyDescription.Title,
    example: 'Hello Neo from Zion city',
  })
  @IsString()
  @Length(PostTitleLength.Min, PostTitleLength.Max)
  public title!: string;

  @ApiProperty({
    description: PostPropertyDescription.VideoUrl,
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  })
  @IsUrl({
    require_protocol: true,
    protocols: ['http', 'https'],
    host_whitelist: [...YOUTUBE_HOST_WHITELIST],
  })
  public videoUrl!: string;
}

export class CreateTextPostDto extends CreatePostBaseDto {
  @ApiProperty({
    description: PostPropertyDescription.Type,
    enum: PostType,
    example: PostType.Text,
  })
  @Equals(PostType.Text)
  public type!: PostType.Text;

  @ApiProperty({
    description: PostPropertyDescription.Title,
    example: 'Hello Neo from Zion city',
  })
  @IsString()
  @Length(PostTitleLength.Min, PostTitleLength.Max)
  public title!: string;

  @ApiProperty({
    description: PostPropertyDescription.Announce,
    example: 'Follow the white rabbit through the matrix of our world today.',
  })
  @IsString()
  @Length(PostAnnounceLength.Min, PostAnnounceLength.Max)
  public announce!: string;

  @ApiProperty({
    description: PostPropertyDescription.Text,
    example:
      'There is no spoon. The matrix is a system, Neo. That system is our enemy and we must understand it.',
  })
  @IsString()
  @Length(PostTextLength.Min, PostTextLength.Max)
  public text!: string;
}

export class CreateQuotePostDto extends CreatePostBaseDto {
  @ApiProperty({
    description: PostPropertyDescription.Type,
    enum: PostType,
    example: PostType.Quote,
  })
  @Equals(PostType.Quote)
  public type!: PostType.Quote;

  @ApiProperty({
    description: PostPropertyDescription.Text,
    example: 'There is no spoon. The matrix is a system we must understand.',
  })
  @IsString()
  @Length(PostQuoteTextLength.Min, PostQuoteTextLength.Max)
  public text!: string;

  @ApiProperty({
    description: PostPropertyDescription.QuoteAuthor,
    example: 'Morpheus',
  })
  @IsString()
  @Length(PostQuoteAuthorLength.Min, PostQuoteAuthorLength.Max)
  public quoteAuthor!: string;
}

export class CreatePhotoPostDto extends CreatePostBaseDto {
  @ApiProperty({
    description: PostPropertyDescription.Type,
    enum: PostType,
    example: PostType.Photo,
  })
  @Equals(PostType.Photo)
  public type!: PostType.Photo;

  @ApiProperty({
    description: PostPropertyDescription.PhotoId,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  public photoId!: string;
}

export class CreateLinkPostDto extends CreatePostBaseDto {
  @ApiProperty({
    description: PostPropertyDescription.Type,
    enum: PostType,
    example: PostType.Link,
  })
  @Equals(PostType.Link)
  public type!: PostType.Link;

  @ApiProperty({
    description: PostPropertyDescription.Url,
    example: 'https://example.com',
  })
  @IsUrl({ require_protocol: true, protocols: ['http', 'https'] })
  public url!: string;

  @ApiProperty({
    description: PostPropertyDescription.Description,
    example: 'Useful link',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, PostDescriptionLength.Max)
  public description?: string;
}

export type CreatePostDto =
  | CreateVideoPostDto
  | CreateTextPostDto
  | CreateQuotePostDto
  | CreatePhotoPostDto
  | CreateLinkPostDto;

export const CREATE_POST_DTO_BY_TYPE = {
  [PostType.Video]: CreateVideoPostDto,
  [PostType.Text]: CreateTextPostDto,
  [PostType.Quote]: CreateQuotePostDto,
  [PostType.Photo]: CreatePhotoPostDto,
  [PostType.Link]: CreateLinkPostDto,
} as const;
