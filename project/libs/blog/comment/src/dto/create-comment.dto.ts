// TODO: добавить декораторы class-validator (@IsString) и @ApiProperty
// TODO: заменить authorId на id из JWT, когда появится guard
export class CreateCommentDto {
  public authorId!: string;
  public text!: string;
}
