import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateDto } from './types/create/request.dto';
import { PostParamDto, PostUpdateDto } from './types/update/request.dto';
import { PostDeleteDto } from './types/delete/request.dto';
import { PostFindManyDto } from './types/find-many/request.dto';

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

  @Get('/:postId')
  async getPost(@Param() param: PostParamDto) {
    return await this.postService.findUnique(param.postId);
  }

  @Get()
  async findMany(@Query() query: PostFindManyDto) {
    return await this.postService.findMany(query);
  }
}
