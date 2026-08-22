import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/blog-models';
import { PostModule } from '@project/post';

import { LikeController } from './like.controller';
import { LikeFactory } from './like.factory';
import { LikeRepository } from './like.repository';
import { LikeService } from './like.service';

@Module({
  imports: [PrismaClientModule, PostModule],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository, LikeFactory],
  exports: [LikeService],
})
export class LikeModule {}
