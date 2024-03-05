import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentCreateDto {
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
