import { IsNotEmpty, IsString } from 'class-validator';

export class BadWordsCreateDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
