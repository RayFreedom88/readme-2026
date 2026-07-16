import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { LikePropertyDescription } from '../like.constant';

export class LikeRdo {
  @ApiProperty({
    description: LikePropertyDescription.Id,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: LikePropertyDescription.PostId,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  public postId!: string;

  @ApiProperty({
    description: LikePropertyDescription.UserId,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  public userId!: string;

  @ApiProperty({
    description: LikePropertyDescription.CreatedAt,
    example: '1999-03-31T00:00:00.000Z',
  })
  @Expose()
  public createdAt!: Date;
}
