import { Injectable } from '@nestjs/common';
import { BadWordsRepository } from './badwords.repository';
import { IBadWordsCreate } from './types/create/request.interface';
import { BadWords } from '@prisma/client';
import { IBadWordsUpdate } from './types/update/request.interface';
import { IBadWordFindMany } from './types/find-many/request.interface';

@Injectable()
export class BadwordsService {
  constructor(private badWordRepository: BadWordsRepository) {}

  async create(data: IBadWordsCreate): Promise<string> {
    await this.badWordRepository.existContent(data.content);
    await this.badWordRepository.create(data);
    return '비속어가 등록되었습니다.';
  }

  async update(id: number, data: IBadWordsUpdate): Promise<string> {
    await this.badWordRepository.findUniqueOrThrow(id);
    await this.badWordRepository.existContent(data.content);
    await this.badWordRepository.update(id, data);
    return '수정을 완료하였습니다.';
  }

  async softDelete(id: number): Promise<string> {
    await this.badWordRepository.findUniqueOrThrow(id);
    await this.badWordRepository.softDelete(id);
    return '삭제가 완료되었습니다.';
  }

  async findUnique(id: number): Promise<BadWords> {
    return await this.badWordRepository.findUniqueOrThrow(id);
  }

  async findMany(data: IBadWordFindMany) {
    return await this.badWordRepository.findMany(data);
  }
}
