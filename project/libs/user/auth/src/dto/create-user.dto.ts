import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { AuthPropertyDescription } from '../auth.constant';

export class CreateUserDto {
  @ApiProperty({
    description: AuthPropertyDescription.Email,
    example: 'neo@notfound.local',
  })
  @IsEmail()
  public email!: string;

  @ApiProperty({
    description: AuthPropertyDescription.Firstname,
    example: 'Tomas',
  })
  @IsString()
  @Length(1, 50)
  public firstname!: string;

  @ApiProperty({
    description: AuthPropertyDescription.Lastname,
    example: 'Anderson',
  })
  @IsString()
  @Length(1, 50)
  public lastname!: string;

  @ApiProperty({
    description: AuthPropertyDescription.Password,
    example: 'password',
  })
  @IsString()
  @MinLength(6)
  public password!: string;

  @ApiProperty({
    description: AuthPropertyDescription.AvatarId,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsString()
  public avatarId?: string;
}
