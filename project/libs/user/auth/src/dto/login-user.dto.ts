import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import {
  AuthPropertyDescription,
  AuthUserExceptionMessage,
} from '../auth.constant';

export class LoginUserDto {
  @ApiProperty({
    description: AuthPropertyDescription.Email,
    example: 'neo@notfound.local',
  })
  @IsEmail(
    {},
    {
      message: AuthUserExceptionMessage.InvalidEmail,
    },
  )
  public email!: string;

  @ApiProperty({
    description: AuthPropertyDescription.Password,
    example: 'password',
  })
  @IsString()
  @MinLength(6)
  public password!: string;
}
