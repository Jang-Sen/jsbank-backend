import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({ example: '홍길동' })
  username: string;

  @IsString()
  @MinLength(7)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)
  @ApiProperty({ example: '123456a!' })
  password?: string;

  @IsEmail()
  @ApiProperty({ example: 'example@exam.com' })
  email: string;

  @IsNumber()
  @ApiProperty({ example: 1012345678 })
  phone?: number;
}
