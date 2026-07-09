import { Module } from '@nestjs/common';

import { PostController } from './post.controller';
import { PostFactory } from './post.factory';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository, PostFactory],
  exports: [PostService, PostRepository],
})
export class PostModule {}
