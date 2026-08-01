import { ApiProperty } from '@nestjs/swagger';

import type { PostState, PostType } from '@project/core';

import { PostPropertyDescription } from '../post.constant';

// TODO: добавить декораторы class-validator
// TODO: разделить на отдельные DTO по подтипам Post (Video/Text/Quote/Photo/Link)
// TODO: заменить authorId на id из JWT, когда появится guard
export class CreatePostDto {
  @ApiProperty({
    description: PostPropertyDescription.Type,
    example: 'text',
  })
  public type!: PostType;

  @ApiProperty({
    description: PostPropertyDescription.State,
    example: 'published',
    required: false,
  })
  public state?: PostState;

  @ApiProperty({
    description: PostPropertyDescription.AuthorId,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public authorId!: string;

  @ApiProperty({
    description: PostPropertyDescription.Tags,
    example: ['nestjs', 'typescript'],
    required: false,
    isArray: true,
    type: String,
  })
  public tags?: string[];

  @ApiProperty({
    description: PostPropertyDescription.PublishedAt,
    example: '1999-03-31T00:00:00.000Z',
    required: false,
  })
  public publishedAt?: Date;

  @ApiProperty({
    description: PostPropertyDescription.IsRepost,
    example: false,
    required: false,
  })
  public isRepost?: boolean;

  @ApiProperty({
    description: PostPropertyDescription.OriginalAuthorId,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  public originalAuthorId?: string;

  @ApiProperty({
    description: PostPropertyDescription.OriginalPostId,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  public originalPostId?: string;

  @ApiProperty({
    description: PostPropertyDescription.Title,
    example: 'Hello Neo',
    required: false,
  })
  public title?: string;

  @ApiProperty({
    description: PostPropertyDescription.Announce,
    example: 'Follow the white rabbit',
    required: false,
  })
  public announce?: string;

  @ApiProperty({
    description: PostPropertyDescription.Text,
    example: 'There is no spoon.',
    required: false,
  })
  public text?: string;

  @ApiProperty({
    description: PostPropertyDescription.VideoUrl,
    example: 'https://example.com/video.mp4',
    required: false,
  })
  public videoUrl?: string;

  @ApiProperty({
    description: PostPropertyDescription.PhotoId,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  public photoId?: string;

  @ApiProperty({
    description: PostPropertyDescription.Url,
    example: 'https://example.com',
    required: false,
  })
  public url?: string;

  @ApiProperty({
    description: PostPropertyDescription.Description,
    example: 'Useful link',
    required: false,
  })
  public description?: string;

  @ApiProperty({
    description: PostPropertyDescription.QuoteAuthor,
    example: 'Morpheus',
    required: false,
  })
  public quoteAuthor?: string;
}
