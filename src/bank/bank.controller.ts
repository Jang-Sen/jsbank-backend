import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { BankService } from '@bank/bank.service';
import { CreateBankDto } from '@bank/dto/create-bank.dto';
import { UpdateBankDto } from '@bank/dto/update-bank.dto';
import { RoleGuard } from '@auth/guard/role.guard';
import { Role } from '@user/entities/role.enum';
import { PageDto } from '@common/dto/page.dto';
import { Bank } from '@bank/entities/bank.entity';
import { PageOptionsDto } from '@common/dto/page-options.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from '@minio-client/interface/file.model';

@ApiTags('Bank')
@Controller({ path: 'bank', version: '2' })
export class BankController {
  constructor(private readonly bankService: BankService) {}

  // 전체 조회 api
  @Get('/all')
  async getAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Bank>> {
    return await this.bankService.getAll(pageOptionsDto);
  }

  // 상세 조회 api
  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.bankService.getBankById(id);
  }

  // 계좌 등록 api
  @ApiBody({ type: CreateBankDto })
  @Post('/create')
  async create(@Body() dto: CreateBankDto) {
    return await this.bankService.create(dto);
  }

  // 계좌 삭제 API
  @Delete('/:id')
  @UseGuards(RoleGuard(Role.ADMIN))
  async delete(@Param('id') id: string) {
    return await this.bankService.delete(id);
  }

  // 계좌 수정 API
  @Put('/:id')
  // @UseGuards(RoleGuard(Role.ADMIN))
  @UseInterceptors(FileInterceptor('img'))
  @ApiBody({
    description: '수정 DTO',
    schema: {
      type: 'object',
      properties: {
        bankName: {
          type: 'string',
          description: '은행 이름',
          example: '신한',
        },
        user: {
          type: 'string',
          description: '유저 이름',
          example: '홍길동',
        },
        amount: {
          type: 'number',
          description: '계좌 금액',
          example: 50000,
        },
        img: {
          type: 'string',
          format: 'binary',
          description: 'bankImg',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() dto?: UpdateBankDto,
    @UploadedFile() img?: BufferedFile,
  ) {
    return await this.bankService.update(id, dto, img);
  }
}
