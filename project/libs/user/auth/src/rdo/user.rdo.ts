import { Expose } from 'class-transformer';

// TODO: добавить @ApiProperty на каждое поле для OpenAPI-документации
export class UserRdo {
  @Expose()
  public id!: string;

  @Expose()
  public email!: string;

  @Expose()
  public firstname!: string;

  @Expose()
  public lastname!: string;

  @Expose()
  public avatarId?: string;

  @Expose()
  public createdAt!: string;
}
