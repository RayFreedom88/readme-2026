import { Expose } from 'class-transformer';

// TODO: добавить @ApiProperty на каждое поле для OpenAPI-документации
export class CommentRdo {
  @Expose()
  public id!: string;

  @Expose()
  public postId!: string;

  @Expose()
  public authorId!: string;

  @Expose()
  public text!: string;

  @Expose()
  public createdAt!: Date;
}
