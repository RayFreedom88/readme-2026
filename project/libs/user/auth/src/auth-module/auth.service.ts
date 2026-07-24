import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';

import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';
import { mongoConfig } from '@project/user-config';

import { AuthUserExceptionMessage } from '../auth.constant';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,

    @Inject(mongoConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof mongoConfig>,
  ) {
    // Извлекаем настройки из конфигурации
    console.log(this.databaseConfig.host);
    console.log(this.databaseConfig.user);
  }

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const { email, firstname, lastname, password, avatarId } = dto;

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthUserExceptionMessage.Exists);
    }

    const userEntity = await new BlogUserEntity({
      email,
      firstname,
      lastname,
      avatarId,
      createdAt: new Date(),
      passwordHash: '',
    }).setPassword(password);

    return await this.blogUserRepository.save(userEntity);
  }

  // TODO: вернуть { user, accessToken } — сгенерировать JWT через JwtService и TokenPayload из @project/core
  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthUserExceptionMessage.NotFound);
    }

    const isPasswordValid = await existUser.comparePassword(password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(AuthUserExceptionMessage.PasswordWrong);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const existUser = await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(AuthUserExceptionMessage.NotFound);
    }

    return existUser;
  }
}
