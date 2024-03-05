import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PostCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  description: string;

  @IsNotEmpty()
  @IsString()
  memberId: string;
}
