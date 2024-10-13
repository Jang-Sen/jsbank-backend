import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { User } from '@user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  // 회원 등록 로직
  async create(dto: CreateUserDto) {
    const user = this.repository.create(dto);

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
