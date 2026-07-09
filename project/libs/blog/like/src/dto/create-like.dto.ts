// TODO: добавить декораторы class-validator (@IsString) и @ApiProperty
// TODO: заменить userId на id из JWT, когда появится guard
export class CreateLikeDto {
  public userId!: string;
}
