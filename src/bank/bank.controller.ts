import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BankService } from '@bank/bank.service';
import { CreateBankDto } from '@bank/dto/create-bank.dto';
import { UpdateBankDto } from '@bank/dto/update-bank.dto';
import { RoleGuard } from '@auth/guard/role.guard';
import { Role } from '@user/entities/role.enum';
import { PageDto } from '@common/dto/page.dto';
import { Bank } from '@bank/entities/bank.entity';
import { PageOptionsDto } from '@common/dto/page-options.dto';

@ApiTags('Bank')
@Controller('bank')
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
  @UseGuards(RoleGuard(Role.ADMIN))
  @ApiBody({ type: CreateBankDto })
  async update(@Param('id') id: string, @Body() dto: UpdateBankDto) {
    return await this.bankService.update(id, dto);
  }
}
