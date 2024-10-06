import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';

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
  @Post('/create')
  async create(@Body() dto: CreateBankDto) {
    return await this.bankService.create(dto);
  }
}
