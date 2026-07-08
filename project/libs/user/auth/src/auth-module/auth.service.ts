import { Injectable } from '@nestjs/common';

import { BlogUserRepository } from '@project/blog-user';

@Injectable()
export class AuthService {
  constructor(private readonly blogUserRepository: BlogUserRepository) {}
}
