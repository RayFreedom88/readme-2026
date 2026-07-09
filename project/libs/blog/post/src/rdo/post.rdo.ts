import { Expose } from 'class-transformer';

// TODO: добавить @ApiProperty на каждое поле для OpenAPI-документации
export class PostRdo {
  @Expose()
  public id!: string;

  @Expose()
  public type!: string;

  @Expose()
  public state!: string;

  @Expose()
  public authorId!: string;

  @Expose()
  public tags!: string[];

  @Expose()
  public publishedAt!: Date;

  @Expose()
  public isRepost!: boolean;

  @Expose()
  public likesCount!: number;

  @Expose()
  public commentsCount!: number;

  @Expose()
  public createdAt!: Date;

  @Expose()
  public title?: string;

  @Expose()
  public announce?: string;

  @Expose()
  public text?: string;

  @Expose()
  public videoUrl?: string;

  @Expose()
  public photoId?: string;

  @Expose()
  public url?: string;

  @Expose()
  public description?: string;

  @Expose()
  public quoteAuthor?: string;
}
