import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { LikePropertyDescription } from '../like.constant';

export class CreateLikeDto {
  // TODO: replace userId with the verified identity from API Gateway.
  @ApiProperty({
    description: LikePropertyDescription.UserId,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  public userId!: string;
}
