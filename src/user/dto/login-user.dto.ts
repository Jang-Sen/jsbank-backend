import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({ example: 'example@exam.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: '123456a!' })
  password?: string;
}
