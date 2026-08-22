import { Module } from '@nestjs/common';

import { BlogConfigModule } from '@project/blog-config';
import { CommentModule } from '@project/comment';
import { LikeModule } from '@project/like';
import { PostModule } from '@project/post';

@Module({
  imports: [BlogConfigModule, PostModule, CommentModule, LikeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
