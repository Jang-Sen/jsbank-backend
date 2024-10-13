import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from '@bank/entities/bank.entity';
import { CreateBankDto } from '@bank/dto/create-bank.dto';
import { UpdateBankDto } from '@bank/dto/update-bank.dto';

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

  async delete(id: string) {
    const bank = await this.repository.delete({ id });

    if (!bank) {
      throw new NotFoundException('찾을 수 없는 계좌입니다.');
    }

    return bank;
  }

  async update(id: string, dto: UpdateBankDto) {
    const bank = await this.repository.update(id, dto);

    if (!bank) {
      throw new NotFoundException('찾을 수 없는 계좌입니다.');
    }

    return bank;
  }
}
