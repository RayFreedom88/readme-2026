import { Module } from '@nestjs/common';

import { AuthModule } from '@project/auth';
import { BlogUserModule } from '@project/blog-user';

@Module({
  imports: [AuthModule, BlogUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
