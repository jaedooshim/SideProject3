import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class MemberCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @IsNotEmpty()
  @IsString()
  nickname: string;
}
