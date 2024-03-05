import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { IMemberCreate } from './types/create/request.interface';
import { BcryptService } from '../_common/bcrypt/bcrypt.service';
import { IMemberUpdate } from './types/update/request.interface';
import { IMemberDelete } from './types/delete/request.interface';
import { Member } from '@prisma/client';
import { IMemberFindMany } from './types/find-many/request.interface';

@Injectable()
export class MemberService {
  constructor(
    private memberRepository: MemberRepository,
    private bcryptService: BcryptService,
  ) {}

  async create(data: IMemberCreate): Promise<string> {
    await this.memberRepository.findUniqueEmail(data.email);
    await this.memberRepository.findUniqueNickName(data.nickname);
    data.password = await this.bcryptService.hash(data.password);
    await this.memberRepository.create(data);
    return '회원생성이 정상적으로 되었습니다.';
  }

  async update(memberId: string, data: IMemberUpdate): Promise<string> {
    const member = await this.memberRepository.findUniqueOrThrow(memberId);
    await this.verifyAccessAuthorityOrThrow(member.memberId, data.memberId);
    await this.memberRepository.findUniqueEmail(data.email);
    await this.memberRepository.findUniqueNickName(data.nickname);
    await this.memberRepository.update(memberId, data);
    return '회원정보가 정상적으로 수정되었습니다.';
  }

  async updatePassword(memberId: string, oldPassword: string, newPassword: string): Promise<string> {
    const member = await this.memberRepository.findUniqueOrThrow(memberId);
    const password = await this.bcryptService.compare(oldPassword, member.password);
    if (!password) throw new ConflictException('비밀번호가 일치하지 않습니다.');

    const hashPassword = await this.bcryptService.hash(newPassword);
    await this.memberRepository.updatePassword(memberId, hashPassword);
    return '비밀번호가 정상적으로 변경되었습니다.';
  }

  async softDelete(memberId: string, data: IMemberDelete): Promise<string> {
    const member = await this.memberRepository.findUniqueOrThrow(memberId);
    await this.verifyAccessAuthorityOrThrow(member.memberId, data.memberId);
    await this.memberRepository.delete(memberId);
    return '회원삭제가 정상적으로 처리되었습니다.';
  }

  async findUnique(memberId: string): Promise<Member> {
    const member = await this.memberRepository.findUniqueOrThrow(memberId);
    return member;
  }

  async findMany(data: IMemberFindMany) {
    return await this.memberRepository.findMany(data);
  }

  async verifyAccessAuthorityOrThrow(id: string, memberId: string): Promise<void> {
    if (id !== memberId) throw new ForbiddenException('해당되는 권한이 없습니다.');
  }
}
