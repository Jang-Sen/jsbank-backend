import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import { MailService } from '@mail/mail.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { LoginUserDto } from '@user/dto/login-user.dto';
import { TokenInterface } from '@auth/interface/token.interface';
import { Provider } from '@user/entities/provider.enum';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  // 회원가입 로직
  async signup(dto: CreateUserDto) {
    return await this.userService.create({ ...dto, provider: Provider.LOCAL });
  }

  // 로그인 로직
  async login(dto: LoginUserDto) {
    // mail 유무 -> 비밀번호 체크 -> return
    const user = await this.userService.getUserBy('email', dto.email);
    const pass = await bcrypt.compare(dto.password, user.password);

    if (!pass) {
      throw new HttpException(
        '패스워드가 일치하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  // 회원가입 시 메일 전송 로직
  async signupMail(email: string) {
    await this.mailService.sendMail({
      to: email,
      subject: '안녕하세요. 장센은행에 가입해주셔서 감사합니다.',
      html: '<h2>회원가입 감사드립니다.</h2>',
    });
  }

  // 토큰 발행 로직
  public generateToken(userId: string) {
    const load: TokenInterface = { userId };
    const token = this.jwtService.sign(load, {
      secret: this.configService.get('TOKEN_SECRET'),
      expiresIn: this.configService.get('TOKEN_TIME'),
    });

    return token;
  }

  // 이메일 OTP 로직
  async sendEmailOTP(email: string) {
    const num = this.generateOTP();
    // 캐시에 저장
    await this.cache.set(email, num);

    return this.mailService.sendMail({
      to: email,
      subject: '회원님이 요청하신 인증번호 입니다.',
      text: `인증 번호는 ${num} 입니다.`,
    });
  }

  // 비밀번호 변경 url 이메일 전송 로직
  async findPasswordSendEmail(email: string) {
    const payload = { email };
    const user = await this.userService.getUserBy('email', email);

    // 소셜 로그인 회원은 이용 불가
    if (user.provider !== Provider.LOCAL) {
      throw new HttpException(
        `소셜 로그인 회원은 이용하실 수 없습니다.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // 비밀번호 변경 관련 토큰 생성
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('FIND_PASSWORD_TOKEN_SECRET'),
      expiresIn: this.configService.get('FIND_PASSWORD_TOKEN_TIME'),
    });

    // 비밀번호 변경 주소
    const url = `${this.configService.get('EMAIL_BASE_URL')}/change/password?token=${token}`;

    // 이메일 전송
    await this.mailService.sendMail({
      to: email,
      subject: 'js_bank 비밀번호 변경 주소입니다.',
      text: `비밀번호 변경 주소: ${url}`,
    });
  }

  // 이메일 인증 랜덤 번호 로직
  generateOTP() {
    let otp = '';

    for (let i = 1; i <= 6; i++) {
      otp += Math.floor(Math.random() * 10);
    }

    return otp;
  }
}
