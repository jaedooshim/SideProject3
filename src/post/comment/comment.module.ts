import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { PrismaModule } from '../../_common/prisma/prisma.module';
import { BadwordsModule } from '../../badwords/badwords.module';

@Module({
  imports: [PrismaModule, BadwordsModule],
  providers: [CommentService, CommentRepository],
  exports: [CommentService],
})
export class CommentModule {}
