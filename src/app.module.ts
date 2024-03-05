import { Module } from '@nestjs/common';
import { PrismaModule } from './_common/prisma/prisma.module';
import { BcryptModule } from './_common/bcrypt/bcrypt.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [PrismaModule, BcryptModule, MemberModule],
})
export class AppModule {}
