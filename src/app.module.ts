import { Module } from '@nestjs/common';
import { PrismaModule } from './_common/prisma/prisma.module';
import { BcryptModule } from './_common/bcrypt/bcrypt.module';
import { MemberModule } from './member/member.module';
import { PostModule } from './post/post.module';
import { BadwordsModule } from './badwords/badwords.module';
import { CommentModule } from './post/comment/comment.module';

@Module({
  imports: [PrismaModule, BcryptModule, MemberModule, PostModule, BadwordsModule, CommentModule],
})
export class AppModule {}
