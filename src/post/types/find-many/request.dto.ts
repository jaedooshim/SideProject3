import { IsNotEmpty, IsNumber } from 'class-validator';

export class PostFindManyDto {
  @IsNotEmpty()
  @IsNumber()
  take: number;

  @IsNotEmpty()
  @IsNumber()
  page: number;
}
