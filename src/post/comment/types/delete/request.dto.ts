import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentDeleteDto {
  @IsNotEmpty()
  @IsString()
  memberId: string;

  @IsNotEmpty()
  @IsNumber()
  postId: number;
}
