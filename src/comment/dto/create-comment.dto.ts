import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsString()
  @ApiProperty({
    example: '신한은행 오래 사용한 유저입니다. 계속 사용하겠습니다.',
  })
  contents: string;
}
