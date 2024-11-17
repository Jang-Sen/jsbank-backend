import { Order } from '@common/constant/order.constant.enum';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PageOptionsDto {
  @IsOptional()
  @ApiPropertyOptional({
    description: '검색어',
  })
  readonly keyword: string;

  @IsOptional()
  @IsEnum(Order)
  @ApiPropertyOptional({
    description: '정렬 기준(기본적으로 오름차순)',
    enum: Order,
    default: Order.ASC,
  })
  readonly order?: Order = Order.ASC;

  @IsOptional()
  // @IsInt()
  // @Min(1)
  @ApiPropertyOptional({
    description: '현재 페이지',
    minimum: 1,
    default: 1,
  })
  readonly page?: number = 1;

  @IsOptional()
  // @IsInt()
  // @Min(1)
  // @Max(50)
  @ApiPropertyOptional({
    description: '페이지에서 보여지는 개수',
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
