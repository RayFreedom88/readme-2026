import { Controller } from '@nestjs/common';
import { BlogUserService } from './blog-user.service';

@Controller('blog-user')
export class BlogUserController {
  constructor(private blogUserService: BlogUserService) {}
}
