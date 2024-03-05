import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberCreateDto } from './types/create/request.dto';
import { MemberParamDto, MemberUpdateDto } from './types/update/request.dto';
import { PassWordUpdateDto } from './types/update-password/request.dto';
import { MemberDeleteDto } from './types/delete/request.dto';
import { Member } from '@prisma/client';
import { MemberFindManyDto } from './types/find-many/request.dto';

@Controller('members')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Post()
  async create(@Body() body: MemberCreateDto): Promise<string> {
    return await this.memberService.create(body);
  }

  @Put('/:memberId')
  async update(@Body() body: MemberUpdateDto, @Param() param: MemberParamDto): Promise<string> {
    return await this.memberService.update(param.memberId, body);
  }

  @Patch('/password/:memberId')
  async updatePassword(@Body() body: PassWordUpdateDto, @Param() param: MemberParamDto): Promise<string> {
    return await this.memberService.updatePassword(param.memberId, body.oldPassword, body.newPassword);
  }

  @Delete('/:memberId')
  async delete(@Body() body: MemberDeleteDto, @Param() param: MemberParamDto): Promise<string> {
    return await this.memberService.softDelete(param.memberId, body);
  }

  @Get('/:memberId')
  async getMember(@Param() param: MemberParamDto): Promise<Member> {
    return await this.memberService.findUnique(param.memberId);
  }

  @Get()
  async findMany(@Query() query: MemberFindManyDto) {
    return await this.memberService.findMany(query);
  }
}
