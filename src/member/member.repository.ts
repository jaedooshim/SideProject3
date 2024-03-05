import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../_common/prisma/prisma.service';
import { IMemberCreate } from './types/create/request.interface';
import { Member } from '@prisma/client';
import { IMemberUpdate } from './types/update/request.interface';
import { IMemberFindMany } from './types/find-many/request.interface';

@Injectable()
export class MemberRepository {
  constructor(private prisma: PrismaService) {}

  private memberRepository = this.prisma.extendedClient.member;

  async create(data: IMemberCreate): Promise<Member> {
    return this.memberRepository.create({ data: { ...data } });
  }

  async update(memberId: string, data: IMemberUpdate): Promise<Member> {
    return this.memberRepository.update({ where: { memberId }, data: { ...data } });
  }

  async delete(memberId: string): Promise<Member> {
    return this.memberRepository.softDelete({ memberId });
  }

  async findMany(data: IMemberFindMany): Promise<Member[]> {
    return this.prisma.member.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findUniqueNickName(nickname: string): Promise<void> {
    const member = await this.memberRepository.findFirst({ where: { nickname } });
    if (member) throw new ConflictException('이미 등록된 닉네임입니다. 다시 한번 확인해주세요.');
  }

  async findUniqueEmail(email: string): Promise<void> {
    const member = await this.memberRepository.findFirst({ where: { email } });
    if (member) throw new ConflictException('이미 등록된 이메일입니다. 다시 한번 확인해주세요.');
  }

  async findUniqueOrThrow(memberId: string): Promise<Member> {
    const member = await this.memberRepository.findFirst({ where: { memberId } });
    if (!member) throw new NotFoundException('해당하는 멤버를 찾을 수 없습니다.');
    return member;
  }

  async updatePassword(memberId: string, newPassword: string): Promise<void> {
    const member = await this.memberRepository.findFirst({ where: { memberId } });
    member.password = newPassword;
    await this.memberRepository.update({ where: { memberId }, data: { password: newPassword } });
  }
}
