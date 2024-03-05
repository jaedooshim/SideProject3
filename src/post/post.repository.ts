import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../_common/prisma/prisma.service';
import { IPostCreate } from './types/create/request.interface';
import { Post } from '@prisma/client';
import { IPostUpdate } from './types/update/request.interface';
import { IPostFindMany } from './types/find-many/request.interface';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}

  private postRepository = this.prisma.extendedClient.post;

  async create(data: IPostCreate): Promise<Post> {
    return this.postRepository.create({ data: { ...data } });
  }

  async update(postId: number, data: IPostUpdate): Promise<Post> {
    return this.postRepository.update({ where: { postId }, data: { ...data } });
  }

  async softDelete(postId: number): Promise<Post> {
    return this.postRepository.softDelete({ postId });
  }

  async findMany(data: IPostFindMany): Promise<Post[]> {
    return this.prisma.post.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        title: 'asc',
      },
    });
  }

  async findUniqueOrThrow(postId: number): Promise<Post> {
    const post = await this.postRepository.findFirst({ where: { postId } });
    if (!post) throw new NotFoundException('해당하는 게시글이 존재하지 않습니다.');
    return post;
  }
}
