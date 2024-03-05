import { IsNotEmpty, IsString } from 'class-validator';

export class PassWordUpdateDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
