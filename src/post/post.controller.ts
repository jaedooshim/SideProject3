import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateDto } from './types/create/request.dto';
import { PostParamDto, PostUpdateDto } from './types/update/request.dto';
import { PostDeleteDto } from './types/delete/request.dto';
import { PostFindManyDto } from './types/find-many/request.dto';
import { CommentCreateDto } from './comment/types/create/request.dto';
import { CommentParamDto, CommentUpdateDto } from './comment/types/update/request.dto';
import { CommentDeleteDto } from './comment/types/delete/request.dto';
import { Comment } from '@prisma/client';
import { CommentFindManyDto } from './comment/types/find-many/request.dto';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async create(@Body() body: PostCreateDto): Promise<string> {
    return await this.postService.create(body);
  }

  @Put('/:postId')
  async update(@Body() body: PostUpdateDto, @Param() param: PostParamDto): Promise<string> {
    return await this.postService.update(param.postId, body);
  }

  @Delete('/:postId')
  async delete(@Body() body: PostDeleteDto, @Param() param: PostParamDto): Promise<string> {
    return await this.postService.softDelete(param.postId, body);
  }

  @Get('/comments')
  async findManyComment(@Query() query: CommentFindManyDto) {
    return await this.postService.findManyComment(query);
  }

  @Get('/:postId')
  async getPost(@Param() param: PostParamDto) {
    return await this.postService.findUnique(param.postId);
  }

  @Get()
  async findMany(@Query() query: PostFindManyDto) {
    return await this.postService.findMany(query);
  }

  @Post('/:postId/comments')
  async createComment(@Body() body: CommentCreateDto, @Param() param: PostParamDto): Promise<string> {
    return await this.postService.createComment(param.postId, body);
  }

  @Patch('/:postId/comments/:commentId')
  async updateComment(@Body() body: CommentUpdateDto, @Param() param: CommentParamDto): Promise<string> {
    return await this.postService.updateComment(param.postId, param.commentId, body);
  }

  @Delete('/:postId/comments/:commentId')
  async deleteComment(@Body() body: CommentDeleteDto, @Param() param: CommentParamDto): Promise<string> {
    return await this.postService.deleteComment(param.postId, param.commentId, body);
  }

  @Get('/:postId/comments/:commentId')
  async getComment(@Param() param: CommentParamDto): Promise<Comment> {
    return await this.postService.getComment(param.postId, param.commentId);
  }
}
