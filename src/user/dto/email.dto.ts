import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailDto {
  @IsEmail()
  @ApiProperty({ example: 'example@exam.com' })
  email: string;
}
