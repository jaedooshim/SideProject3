import { IsNotEmpty, IsNumber } from 'class-validator';

export class CommentFindManyDto {
  @IsNotEmpty()
  @IsNumber()
  take: number;

  @IsNotEmpty()
  @IsNumber()
  page: number;
}
