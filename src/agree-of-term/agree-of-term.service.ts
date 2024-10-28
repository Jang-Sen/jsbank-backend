import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgreeOfTerm } from '@root/agree-of-term/entities/agree-of-term.entity';
import { Repository } from 'typeorm';
import { User } from '@user/entities/user.entity';
import { CreateAgreeOfTermDto } from '@root/agree-of-term/dto/create-agree-of-term.dto';
import { UpdateAgreeOfTermDto } from '@root/agree-of-term/dto/update-agree-of-term.dto';

@Injectable()
export class AgreeOfTermService {
  constructor(
    @InjectRepository(AgreeOfTerm)
    private repository: Repository<AgreeOfTerm>,
  ) {}

  // 이용약관 생성 로직
  async createAgreeOfTerm(user: User, dto: CreateAgreeOfTermDto) {
    const agreeOfTerm = this.repository.create({ user, ...dto });

    await this.repository.save(agreeOfTerm);

    return agreeOfTerm;
  }

  // 이용약관 수정 로직
  async updateAgreeOfTerm(user: User, dto: UpdateAgreeOfTermDto) {
    const result = await this.repository.update(
      { id: user.agreeOfTerm.id },
      dto,
    );

    if (result.affected) {
      return 'update';
    }

    throw new BadRequestException('error');
  }
}
