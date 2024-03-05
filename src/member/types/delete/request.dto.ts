import { IsNotEmpty, IsString } from 'class-validator';

export class MemberDeleteDto {
  @IsNotEmpty()
  @IsString()
  memberId: string;
}
