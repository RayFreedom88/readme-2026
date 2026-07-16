import { ApiProperty } from '@nestjs/swagger';

import { CommentPropertyDescription } from '../comment.constant';

// TODO: добавить декораторы class-validator (@IsString)
// TODO: заменить authorId на id из JWT, когда появится guard
export class CreateCommentDto {
  @ApiProperty({
    description: CommentPropertyDescription.AuthorId,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public authorId!: string;

  @ApiProperty({
    description: CommentPropertyDescription.Text,
    example: 'There is no spoon.',
  })
  public text!: string;
}
