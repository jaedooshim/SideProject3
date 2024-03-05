import { IsNotEmpty, IsString } from 'class-validator';

export class PostDeleteDto {
  @IsNotEmpty()
  @IsString()
  memberId: string;
}
