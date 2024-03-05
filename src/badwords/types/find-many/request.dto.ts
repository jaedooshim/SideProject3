import { IsNotEmpty, IsNumber } from 'class-validator';

export class BadWordFindManyDto {
  @IsNotEmpty()
  @IsNumber()
  take: number;

  @IsNotEmpty()
  @IsNumber()
  page: number;
}
