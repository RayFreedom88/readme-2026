import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { AuthPropertyDescription } from '../auth.constant';

// TODO: добавить @ApiProperty на каждое поле для OpenAPI-документации
export class LoggedUserRdo {
  @ApiProperty({
    description: AuthPropertyDescription.Id,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: AuthPropertyDescription.Email,
    example: 'neo@notfound.local',
  })
  @Expose()
  public email!: string;

  @ApiProperty({
    description: AuthPropertyDescription.AccessToken,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  public accessToken!: string;
}
