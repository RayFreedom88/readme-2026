// TODO: добавить декораторы class-validator (@IsEmail, @IsString, @Length, @IsOptional)

import { ApiProperty } from '@nestjs/swagger';

import { AuthPropertyDescription } from '../auth.constant';

export class CreateUserDto {
  @ApiProperty({
    description: AuthPropertyDescription.Email,
    example: 'neo@notfound.local',
  })
  public email!: string;

  @ApiProperty({
    description: AuthPropertyDescription.Firstname,
    example: 'Tomas',
  })
  public firstname!: string;

  @ApiProperty({
    description: AuthPropertyDescription.Lastname,
    example: 'Anderson',
  })
  public lastname!: string;

  @ApiProperty({
    description: AuthPropertyDescription.Password,
    example: 'password',
  })
  public password!: string;

  @ApiProperty({
    description: AuthPropertyDescription.AvatarId,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  public avatarId?: string;
}
