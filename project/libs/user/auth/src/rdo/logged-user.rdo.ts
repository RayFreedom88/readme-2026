import { Expose } from 'class-transformer';

// TODO: добавить @ApiProperty на каждое поле для OpenAPI-документации
export class LoggedUserRdo {
  @Expose()
  public id!: string;

  @Expose()
  public email!: string;

  @Expose()
  public accessToken!: string;
}
