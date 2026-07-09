// TODO: добавить декораторы class-validator (@IsEmail, @IsString, @Length, @IsOptional)
// TODO: добавить @ApiProperty для OpenAPI-документации
export class CreateUserDto {
  public email!: string;
  public firstname!: string;
  public lastname!: string;
  public password!: string;
  public avatarId?: string;
}
