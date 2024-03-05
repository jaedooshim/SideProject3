import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentUpdateDto {
  @IsNotEmpty()
  @IsString()
  answer: string;

  @IsNotEmpty()
  @IsString()
  memberId: string;

  @IsNotEmpty()
  @IsNumber()
  postId: number;
}

export class CommentParamDto {
  @IsNotEmpty()
  @IsNumber()
  commentId: number;

  @IsNotEmpty()
  @IsNumber()
  postId: number;
}
