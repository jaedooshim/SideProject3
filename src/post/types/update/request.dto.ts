import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class PostUpdateDto {
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

export class PostParamDto {
  @IsNotEmpty()
  @IsNumber()
  postId: number;
}
