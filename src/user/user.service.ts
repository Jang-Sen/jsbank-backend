import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  // 회원 등록 로직
  async create(dto: CreateUserDto) {
    const user = await this.repository.create(dto);

    await this.repository.save(user);

    return user;
  }

  // email or id로 회원 정보 찾기
  async getUserBy(key: 'id' | 'email', value: string) {
    const user = await this.repository.findOneBy({ [key]: value });

    if (user) {
      return user;
    }

    throw new NotFoundException(`존재하지 않은 ${key} 입니다.`);
  }
}
