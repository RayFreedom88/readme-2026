import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { PostState, PostType } from '@project/core';

import { PostPropertyDescription } from '../post.constant';

export class PostRdo {
  @ApiProperty({
    description: PostPropertyDescription.Id,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: PostPropertyDescription.Type,
    enum: PostType,
    example: PostType.Text,
  })
  @Expose()
  public type!: PostType;

  @ApiProperty({
    description: PostPropertyDescription.State,
    enum: PostState,
    example: PostState.Published,
  })
  @Expose()
  public state!: PostState;

  @ApiProperty({
    description: PostPropertyDescription.AuthorId,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  public authorId!: string;

  @ApiProperty({
    description: PostPropertyDescription.Tags,
    example: ['nestjs', 'typescript'],
    isArray: true,
    type: String,
  })
  @Expose()
  public tags!: string[];

  @ApiProperty({
    description: PostPropertyDescription.PublishedAt,
    example: '1999-03-31T00:00:00.000Z',
  })
  @Expose()
  public publishedAt!: Date;

  @ApiProperty({
    description: PostPropertyDescription.IsRepost,
    example: false,
  })
  @Expose()
  public isRepost!: boolean;

  @ApiProperty({
    description: PostPropertyDescription.OriginalAuthorId,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @Expose()
  public originalAuthorId?: string;

  @ApiProperty({
    description: PostPropertyDescription.OriginalPostId,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @Expose()
  public originalPostId?: string;

  @ApiProperty({
    description: PostPropertyDescription.LikesCount,
    example: 10,
  })
  @Expose()
  public likesCount!: number;

  @ApiProperty({
    description: PostPropertyDescription.CommentsCount,
    example: 3,
  })
  @Expose()
  public commentsCount!: number;

  @ApiProperty({
    description: PostPropertyDescription.CreatedAt,
    example: '1999-03-31T00:00:00.000Z',
  })
  @Expose()
  public createdAt!: Date;

  @ApiProperty({
    description: PostPropertyDescription.Title,
    example: 'Hello Neo',
    required: false,
  })
  @Expose()
  public title?: string;

  @ApiProperty({
    description: PostPropertyDescription.Announce,
    example: 'Follow the white rabbit',
    required: false,
  })
  @Expose()
  public announce?: string;

  @ApiProperty({
    description: PostPropertyDescription.Text,
    example: 'There is no spoon.',
    required: false,
  })
  @Expose()
  public text?: string;

  @ApiProperty({
    description: PostPropertyDescription.VideoUrl,
    example: 'https://example.com/video.mp4',
    required: false,
  })
  @Expose()
  public videoUrl?: string;

  @ApiProperty({
    description: PostPropertyDescription.PhotoId,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @Expose()
  public photoId?: string;

  @ApiProperty({
    description: PostPropertyDescription.Url,
    example: 'https://example.com',
    required: false,
  })
  @Expose()
  public url?: string;

  @ApiProperty({
    description: PostPropertyDescription.Description,
    example: 'Useful link',
    required: false,
  })
  @Expose()
  public description?: string;

  @ApiProperty({
    description: PostPropertyDescription.QuoteAuthor,
    example: 'Morpheus',
    required: false,
  })
  @Expose()
  public quoteAuthor?: string;
}
