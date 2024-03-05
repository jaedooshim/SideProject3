import { Module } from '@nestjs/common';
import { BadwordsController } from './badwords.controller';
import { BadwordsService } from './badwords.service';
import { BadWordsRepository } from './badwords.repository';

@Module({
  controllers: [BadwordsController],
  providers: [BadwordsService, BadWordsRepository],
  exports: [BadwordsService],
})
export class BadwordsModule {}
