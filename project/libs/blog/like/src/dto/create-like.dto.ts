import { ApiProperty } from '@nestjs/swagger';

import { LikePropertyDescription } from '../like.constant';

// TODO: добавить декораторы class-validator (@IsString)
// TODO: заменить userId на id из JWT, когда появится guard
export class CreateLikeDto {
  @ApiProperty({
    description: LikePropertyDescription.UserId,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public userId!: string;
}
