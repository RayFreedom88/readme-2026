import { Module } from '@nestjs/common';

import { PostModule } from '@project/post';

import { CommentController } from './comment.controller';
import { CommentFactory } from './comment.factory';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  imports: [PostModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, CommentFactory],
  exports: [CommentService],
})
export class CommentModule {}
