import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../_common/prisma/prisma.service';
import { ICommentCreate } from './types/create/request.interface';
import { Comment } from '@prisma/client';
import { ICommentUpdate } from './types/update/request.interface';
import { ICommentFindMany } from './types/find-many/request.interface';

@Injectable()
export class CommentRepository {
  constructor(private prisma: PrismaService) {}

  private commentRepository = this.prisma.extendedClient.comment;

  async create(data: ICommentCreate): Promise<Comment> {
    return this.commentRepository.create({ data: { ...data } });
  }

  async update(commentId: number, data: ICommentUpdate): Promise<Comment> {
    return this.commentRepository.update({ where: { commentId }, data: { ...data } });
  }

  async softDelete(commentId: number): Promise<Comment> {
    return this.commentRepository.softDelete({ commentId });
  }

  async findMany(data: ICommentFindMany): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findUniqueOrThrow(commentId: number): Promise<Comment> {
    const comment = await this.commentRepository.findFirst({ where: { commentId } });
    if (!comment) throw new NotFoundException('존재하지 않는 댓글입니다. 다시 한번 확인해주세요.');
    return comment;
  }
}
