import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';

import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { AuthUserExceptionMessage } from './auth.constant';

@Injectable()
export class AuthService {
  constructor(private readonly blogUserRepository: BlogUserRepository) {}

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
