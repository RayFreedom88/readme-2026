import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ApiRoute } from '@project/core';
import { fillDto } from '@project/helpers';

import { AuthService } from './auth.service';

import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserRdo } from '../rdo/user.rdo';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';

// TODO: добавить @ApiTags('auth') и декораторы @ApiOperation/@ApiResponse для OpenAPI-документации
@Controller(ApiRoute.Auth.Root)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(ApiRoute.Auth.Register)
  public async register(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @Post(ApiRoute.Auth.Login)
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);

    return fillDto(LoggedUserRdo, verifiedUser.toPOJO());
  }

  @Get(ApiRoute.Auth.Id)
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);

    return fillDto(UserRdo, existUser.toPOJO());
  }
}
