import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import {
  CommentPropertyDescription,
  CommentTextLength,
} from '../comment.constant';

export class CreateCommentDto {
  // TODO: replace authorId with the verified identity from API Gateway.
  @ApiProperty({
    description: CommentPropertyDescription.AuthorId,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  public authorId!: string;

  @ApiProperty({
    description: CommentPropertyDescription.Text,
    example: 'There is no spoon.',
  })
  @IsString()
  @Length(CommentTextLength.Min, CommentTextLength.Max)
  public text!: string;
}
