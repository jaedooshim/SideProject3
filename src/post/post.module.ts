import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { BadwordsModule } from '../badwords/badwords.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [BadwordsModule, CommentModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostService],
})
export class PostModule {}
