import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { AuthPropertyDescription } from '../auth.constant';

// TODO: добавить @ApiProperty на каждое поле для OpenAPI-документации
export class UserRdo {
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
    description: AuthPropertyDescription.Firstname,
    example: 'Tomas',
  })
  @Expose()
  public firstname!: string;

  @ApiProperty({
    description: AuthPropertyDescription.Lastname,
    example: 'Anderson',
  })
  @Expose()
  public lastname!: string;

  @ApiProperty({
    description: AuthPropertyDescription.AvatarId,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @Expose()
  public avatarId?: string;

  @ApiProperty({
    description: AuthPropertyDescription.CreatedAt,
    example: '1999-03-31T00:00:00.000Z',
  })
  @Expose()
  public createdAt!: string;
}
