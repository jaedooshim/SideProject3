import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { BadwordsModule } from '../badwords/badwords.module';

@Module({
  imports: [BadwordsModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostService],
})
export class PostModule {}
