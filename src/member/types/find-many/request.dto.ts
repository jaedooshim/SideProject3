import { IsNotEmpty, IsNumber } from 'class-validator';

export class MemberFindManyDto {
  @IsNotEmpty()
  @IsNumber()
  take: number;

  @IsNotEmpty()
  @IsNumber()
  page: number;
}
