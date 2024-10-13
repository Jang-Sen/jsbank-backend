import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBankDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '신한' })
  bankName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '홍길동' })
  user: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 50000,
  })
  amount: number;
}
