import { ForbiddenException, Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { IPostCreate } from './types/create/request.interface';
import { BadwordsService } from '../badwords/badwords.service';
import { IPostUpdate } from './types/update/request.interface';
import { IPostDelete } from './types/delete/request.interface';
import { Post } from '@prisma/client';
import { IPostFindMany } from './types/find-many/request.interface';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private badWordService: BadwordsService,
  ) {}

  async create(data: IPostCreate): Promise<string> {
    let { title, description } = data;
    const badWords = await this.badWordService.findManyTwo();
    for (const key of badWords) {
      const regex = new RegExp(key.content, 'gi');
      title = title.replace(regex, '**');
      description = description.replace(regex, '**');
    }
    await this.postRepository.create({
      ...data,
      title,
      description,
      isFiltered_title: title.includes('**'),
      isFiltered_description: description.includes('**'),
    });
    return '게시글이 생성되었습니다.';
  }

  async update(postId: number, data: IPostUpdate): Promise<string> {
    let { title, description } = data;
    const badWords = await this.badWordService.findManyTwo();
    for (const key of badWords) {
      const regex = new RegExp(key.content, 'gi');
      title = title.replace(regex, '**');
      description = description.replace(regex, '**');
    }
    await this.postRepository.update(postId, {
      ...data,
      title,
      description,
      isFiltered_title: title.includes('**'),
      isFiltered_description: description.includes('**'),
    });
    return '게시글이 수정되었습니다.';
  }

  async softDelete(postId: number, data: IPostDelete): Promise<string> {
    const member = await this.postRepository.findUniqueOrThrow(postId);
    await this.verifyAccessAuthorityOrThrow(member.memberId, data.memberId);
    await this.postRepository.softDelete(postId);
    return '게시글이 삭제되었습니다.';
  }

  async findUnique(postId: number): Promise<Post> {
    return await this.postRepository.findUniqueOrThrow(postId);
  }

  async findMany(data: IPostFindMany) {
    return await this.postRepository.findMany(data);
  }

  async verifyAccessAuthorityOrThrow(id: string, memberId: string): Promise<void> {
    if (id !== memberId) throw new ForbiddenException('해당되는 권한이 없습니다.');
  }
}
