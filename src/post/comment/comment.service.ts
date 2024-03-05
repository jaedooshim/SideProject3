import { ForbiddenException, Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { ICommentCreate } from './types/create/request.interface';
import { BadwordsService } from '../../badwords/badwords.service';
import { text } from 'express';
import { ICommentUpdate } from './types/update/request.interface';
import { Comment } from '@prisma/client';
import { ICommentDelete } from './types/delete/request.interface';
import { ICommentFindMany } from './types/find-many/request.interface';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private badWordService: BadwordsService,
  ) {}

  async create(data: ICommentCreate): Promise<string> {
    let { answer } = data;
    const badWords = await this.badWordService.findManyTwo();
    for (const key of badWords) {
      const regex = new RegExp(key.content, 'gi');
      answer = answer.replace(regex, '**');
    }
    await this.commentRepository.create({
      ...data,
      answer,
      isFiltered: answer.includes('**'),
    });
    return '댓글이 생성되었습니다.';
  }

  async update(commentId: number, data: ICommentUpdate): Promise<string> {
    const comment = await this.commentRepository.findUniqueOrThrow(commentId);
    await this.verifyAccessCommentIdOrThrow(comment.memberId, data.memberId);
    let { answer } = data;
    const badWords = await this.badWordService.findManyTwo();
    for (const key of badWords) {
      const regex = new RegExp(key.content, 'gi');
      answer = answer.replace(regex, '**');
    }
    await this.commentRepository.update(commentId, {
      ...data,
      answer,
      isFiltered: answer.includes('**'),
    });
    return '댓글이 수정되었습니다.';
  }

  async softDelete(commentId: number, data: ICommentDelete): Promise<string> {
    const comment = await this.commentRepository.findUniqueOrThrow(commentId);
    await this.verifyAccessCommentIdOrThrow(comment.memberId, data.memberId);
    await this.commentRepository.softDelete(commentId);
    return '댓글이 삭제되었습니다.';
  }

  async verifyAccessCommentIdOrThrow(commentMemberId: string, memberId: string): Promise<void> {
    if (commentMemberId !== memberId) throw new ForbiddenException('해당하는 댓글에 대한 권한이 없습니다.');
  }

  async findUnique(commentId: number): Promise<Comment> {
    return await this.commentRepository.findUniqueOrThrow(commentId);
  }

  async findMany(data: ICommentFindMany): Promise<Comment[]> {
    return await this.commentRepository.findMany(data);
  }
}
