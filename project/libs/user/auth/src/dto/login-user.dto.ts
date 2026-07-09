// TODO: добавить декораторы class-validator (@IsEmail, @IsString)
// TODO: добавить @ApiProperty для OpenAPI-документации
export class LoginUserDto {
  public email!: string;
  public password!: string;
}
