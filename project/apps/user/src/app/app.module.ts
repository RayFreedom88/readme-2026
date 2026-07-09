import { Module } from '@nestjs/common';

import { AuthModule } from '@project/auth';
import { BlogUserModule } from '@project/blog-user';

@Module({
  imports: [
    // TODO: добавить ConfigModule.forRoot({ isGlobal: true }) и создать .env с JWT_SECRET
    AuthModule,
    BlogUserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
