import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/blog-models';

import { CreatePostPipe } from './create-post.pipe';
import { PostController } from './post.controller';
import { PostFactory } from './post.factory';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [PrismaClientModule],
  controllers: [PostController],
  providers: [PostService, PostRepository, PostFactory, CreatePostPipe],
  exports: [PostService, PostRepository],
})
export class PostModule {}
