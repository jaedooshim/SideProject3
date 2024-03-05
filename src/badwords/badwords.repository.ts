import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../_common/prisma/prisma.service';
import { IBadWordsCreate } from './types/create/request.interface';
import { BadWords } from '@prisma/client';
import { IBadWordsUpdate } from './types/update/request.interface';
import { IBadWordFindMany } from './types/find-many/request.interface';

@Injectable()
export class BadWordsRepository {
  constructor(private prisma: PrismaService) {}

  private badWordsRepository = this.prisma.extendedClient.badWords;

  async create(data: IBadWordsCreate): Promise<BadWords> {
    return this.badWordsRepository.create({ data: { ...data } });
  }

  async update(badWordsId: number, data: IBadWordsUpdate): Promise<BadWords> {
    return this.badWordsRepository.update({ where: { badWordsId }, data: { ...data } });
  }

  async softDelete(badWordsId: number): Promise<BadWords> {
    return this.badWordsRepository.softDelete({ badWordsId });
  }

  async findMany(data: IBadWordFindMany): Promise<BadWords[]> {
    return this.prisma.badWords.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        content: 'asc',
      },
    });
  }

  async findManyTwo(): Promise<BadWords[]> {
    return this.badWordsRepository.findMany();
  }

  async findUniqueOrThrow(badWordsId: number): Promise<BadWords> {
    const words = await this.badWordsRepository.findFirst({ where: { badWordsId } });
    if (!words) throw new NotFoundException('해당하는 비속어가 존재하지 않습니다.');
    return words;
  }

  async existContent(content: string): Promise<void> {
    const words = await this.badWordsRepository.findFirst({ where: { content } });
    if (words) throw new ConflictException('이미 등록되어 있는 비속어 입니다.');
  }
}
