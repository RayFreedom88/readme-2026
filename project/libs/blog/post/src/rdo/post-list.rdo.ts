import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { PostRdo } from './post.rdo';

import { PostPropertyDescription } from '../post.constant';

export class PostListRdo {
  @ApiProperty({
    description: PostPropertyDescription.Items,
    type: [PostRdo],
  })
  @Expose()
  @Type(() => PostRdo)
  public items!: PostRdo[];

  @ApiProperty({
    description: PostPropertyDescription.Total,
    example: 100,
  })
  @Expose()
  public total!: number;

  @ApiProperty({
    description: PostPropertyDescription.Page,
    example: 1,
  })
  @Expose()
  public page!: number;

  @ApiProperty({
    description: PostPropertyDescription.Limit,
    example: 25,
  })
  @Expose()
  public limit!: number;
}
