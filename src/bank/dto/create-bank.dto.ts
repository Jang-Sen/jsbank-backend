import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

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
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty({
    example: 50000,
  })
  amount: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'bank.png' })
  bankImg?: string;
}
