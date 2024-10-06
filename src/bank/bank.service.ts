import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from './entities/bank.entity';
import { Repository } from 'typeorm';
import { CreateBankDto } from './dto/create-bank.dto';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private repository: Repository<Bank>,
  ) {}

  async getAll() {
    return await this.repository.find();
  }

  async getBankById(id: string) {
    const bank = await this.repository.findOneBy({ id: id });

    if (!bank) {
      throw new NotFoundException('찾을 수 없는 계좌입니다.');
    }

    return bank;
  }

  async create(dto: CreateBankDto) {
    const bank = await this.repository.create(dto);
    await this.repository.save(bank);

    return bank;
  }
}
