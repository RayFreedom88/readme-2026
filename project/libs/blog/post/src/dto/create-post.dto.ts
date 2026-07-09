import type { PostState, PostType } from '@project/core';

// TODO: добавить декораторы class-validator и @ApiProperty
// TODO: разделить на отдельные DTO по подтипам Post (Video/Text/Quote/Photo/Link)
// TODO: заменить authorId на id из JWT, когда появится guard
export class CreatePostDto {
  public type!: PostType;
  public state?: PostState;
  public authorId!: string;
  public tags?: string[];
  public publishedAt?: Date;

  public isRepost?: boolean;
  public originalAuthorId?: string;
  public originalPostId?: string;

  public title?: string;
  public announce?: string;
  public text?: string;
  public videoUrl?: string;
  public photoId?: string;
  public url?: string;
  public description?: string;
  public quoteAuthor?: string;
}
