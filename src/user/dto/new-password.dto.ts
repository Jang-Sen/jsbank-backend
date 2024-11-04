import { IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewPasswordDto {
  @IsString()
  @ApiProperty({ description: '비밀번호 변경에 필요한 토큰' })
  token: string; // 비밀번호 변경에 필요한 토큰

  @IsString()
  @MinLength(7)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)
  @ApiProperty({ description: '신규 비밀번호', example: '123456a!!' })
  password: string; // 신규 비밀번호
}
