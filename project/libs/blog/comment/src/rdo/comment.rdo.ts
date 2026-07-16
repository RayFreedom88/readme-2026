import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { CommentPropertyDescription } from '../comment.constant';

export class CommentRdo {
  @ApiProperty({
    description: CommentPropertyDescription.Id,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: CommentPropertyDescription.PostId,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  public postId!: string;

  @ApiProperty({
    description: CommentPropertyDescription.AuthorId,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  public authorId!: string;

  @ApiProperty({
    description: CommentPropertyDescription.Text,
    example: 'There is no spoon.',
  })
  @Expose()
  public text!: string;

  @ApiProperty({
    description: CommentPropertyDescription.CreatedAt,
    example: '1999-03-31T00:00:00.000Z',
  })
  @Expose()
  public createdAt!: Date;
}
