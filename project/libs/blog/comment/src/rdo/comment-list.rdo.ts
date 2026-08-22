import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { CommentRdo } from './comment.rdo';

import { CommentPropertyDescription } from '../comment.constant';

export class CommentListRdo {
  @ApiProperty({
    description: CommentPropertyDescription.Items,
    type: [CommentRdo],
  })
  @Expose()
  @Type(() => CommentRdo)
  public items!: CommentRdo[];

  @ApiProperty({
    description: CommentPropertyDescription.Total,
    example: 100,
  })
  @Expose()
  public total!: number;

  @ApiProperty({
    description: CommentPropertyDescription.Page,
    example: 1,
  })
  @Expose()
  public page!: number;

  @ApiProperty({
    description: CommentPropertyDescription.Limit,
    example: 50,
  })
  @Expose()
  public limit!: number;
}
