import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDtoParametersInterface } from '@common/interface/page-meta-dto-parameters.interface';

export class PageMetaDto {
  @ApiProperty({ description: '현재 페이지' })
  readonly page: number;

  @ApiProperty({ description: '페이지에서 보여지는 개수' })
  readonly take: number;

  @ApiProperty({ description: '데이터 전체 개수' })
  readonly itemCount: number;

  @ApiProperty({ description: '페이지 전체 개수' })
  readonly pageCount: number;

  @ApiProperty({ description: '이전 페이지가 있는지 없는지' })
  readonly hasPreviousPage: boolean;

  @ApiProperty({ description: '다음 페이지가 있는지 없는지' })
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParametersInterface) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
