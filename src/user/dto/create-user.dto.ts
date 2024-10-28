import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Provider } from '@user/entities/provider.enum';
import { AgreeOfTerm } from '@root/agree-of-term/entities/agree-of-term.entity';
import { CreateAgreeOfTermDto } from '@root/agree-of-term/dto/create-agree-of-term.dto';

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

  @IsString()
  provider?: Provider;

  @IsString()
  profileImg?: string;

  @ApiProperty({ type: CreateAgreeOfTermDto })
  agreeOfTerm?: AgreeOfTerm;
}
