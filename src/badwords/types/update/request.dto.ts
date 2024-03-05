import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BadWordUpdateDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}

export class BadWordParamDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
