import { Expose } from 'class-transformer';

// TODO: добавить @ApiProperty на каждое поле для OpenAPI-документации
export class LikeRdo {
  @Expose()
  public id!: string;

  @Expose()
  public postId!: string;

  @Expose()
  public userId!: string;

  @Expose()
  public createdAt!: Date;
}
