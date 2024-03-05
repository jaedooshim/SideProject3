import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BadwordsService } from './badwords.service';
import { BadWordsCreateDto } from './types/create/request.dto';
import { BadWordParamDto, BadWordUpdateDto } from './types/update/request.dto';
import { BadWords } from '@prisma/client';
import { BadWordFindManyDto } from './types/find-many/request.dto';

@Controller('badwords')
export class BadwordsController {
  constructor(private badWordService: BadwordsService) {}

  @Post()
  async create(@Body() body: BadWordsCreateDto): Promise<string> {
    return await this.badWordService.create(body);
  }

  @Patch('/:id')
  async update(@Body() body: BadWordUpdateDto, @Param() param: BadWordParamDto): Promise<string> {
    return await this.badWordService.update(param.id, body);
  }

  @Delete('/:id')
  async delete(@Param() param: BadWordParamDto): Promise<string> {
    return await this.badWordService.softDelete(param.id);
  }

  @Get('/:id')
  async findUnique(@Param() param: BadWordParamDto): Promise<BadWords> {
    return await this.badWordService.findUnique(param.id);
  }

  @Get()
  async findMany() {
    return await this.badWordService.findManyTwo();
  }
}
