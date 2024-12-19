import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailValidationDto {
  @IsEmail()
  @ApiProperty({ description: '유저 이메일' })
  email: string;

  @IsString()
  @ApiProperty({ description: '이메일에 전송된 OTP' })
  code: string;
}
