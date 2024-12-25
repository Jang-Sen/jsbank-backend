import { IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MovieUrlDto {
  @IsString()
  @ApiProperty({
    description: '영화 순위 분류(now_playing, popular, top_rated, upcoming)',
    example: 'popular',
  })
  list: string;

  @IsString()
  @ApiPropertyOptional({
    description: '나라별',
    example: 'kr',
  })
  language?: string;

  @IsNumber()
  @ApiPropertyOptional({
    description: '페이지 수',
    example: 1,
  })
  page?: number;
}
