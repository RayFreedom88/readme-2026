import { ApiProperty } from '@nestjs/swagger';

import { AuthPropertyDescription } from '../auth.constant';

// TODO: добавить декораторы class-validator (@IsEmail, @IsString)
export class LoginUserDto {
  @ApiProperty({
    description: AuthPropertyDescription.Email,
    example: 'neo@notfound.local',
  })
  public email!: string;

  @ApiProperty({
    description: AuthPropertyDescription.Password,
    example: 'password',
  })
  public password!: string;
}
