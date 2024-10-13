import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BankService } from '@bank/bank.service';
import { CreateBankDto } from '@bank/dto/create-bank.dto';
import { UpdateBankDto } from '@bank/dto/update-bank.dto';

@ApiTags('Bank')
@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  // 전체 조회 api
  @Get('/all')
  async getAll() {
    return await this.bankService.getAll();
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
  async delete(@Param('id') id: string) {
    return await this.bankService.delete(id);
  }

  // 계좌 수정 API
  @ApiBody({ type: CreateBankDto })
  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateBankDto) {
    return await this.bankService.update(id, dto);
  }
}
