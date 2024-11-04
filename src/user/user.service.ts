import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { User } from '@user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Provider } from '@user/entities/provider.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
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

  // 토큰을 이용한 비밀번호 변경 로직
  async changePasswordWithToken(token: string, newPassword: string) {
    const { email } = await this.jwtService.verify(token, {
      secret: this.configService.get('FIND_PASSWORD_TOKEN_SECRET'),
    });

    // 유저 찾기
    const user = await this.getUserBy('email', email);

    // 소셜 로그인 계정일 경우 이용 불가
    if (user.provider !== Provider.LOCAL) {
      throw new HttpException(
        `소셜 회원은 이용 불가합니다.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // 변경할 비밀번호 암호화
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, genSalt);

    // 비밀번호 변경
    const result = await this.repository.update(user.id, {
      password: hashedPassword,
    });

    if (!result) {
      throw new BadRequestException('Bad Request');
    }

    return 'Updated New Password.';
  }
}
