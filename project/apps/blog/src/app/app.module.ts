import { Module } from '@nestjs/common';

import { CommentModule } from '@project/comment';
import { LikeModule } from '@project/like';
import { PostModule } from '@project/post';

@Module({
  imports: [
    // TODO: добавить ConfigModule.forRoot({ isGlobal: true }), когда появится общая конфигурация сервиса
    PostModule,
    CommentModule,
    LikeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
