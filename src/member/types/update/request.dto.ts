import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class MemberUpdateDto {
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
  nickname: string;

  @IsNotEmpty()
  @IsString()
  memberId: string;
}

export class MemberParamDto {
  @IsNotEmpty()
  @IsString()
  memberId: string;
}
