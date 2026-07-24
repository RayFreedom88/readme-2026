import { Module } from '@nestjs/common';

import { AuthModule } from '@project/auth';
import { BlogUserModule } from '@project/blog-user';
import { UserConfigModule } from '@project/user-config';

@Module({
  imports: [AuthModule, BlogUserModule, UserConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
