import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@auth/auth.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { LocalAuthGuard } from '@auth/guard/local-auth.guard';
import { RequestUserInterface } from '@auth/interface/requestUser.interface';
import { TokenGuard } from '@auth/guard/token.guard';
import { LoginUserDto } from '@user/dto/login-user.dto';
import { GoogleAuthGuard } from '@auth/guard/google-auth.guard';
import { KakaoAuthGuard } from '@auth/guard/kakao-auth.guard';
import { NaverAuthGuard } from '@auth/guard/naver-auth.guard';
import { EmailDto } from '@user/dto/email.dto';
import { NewPasswordDto } from '@user/dto/new-password.dto';
import { UserService } from '@user/user.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // 회원가입 API
  @ApiBody({ type: CreateUserDto })
  @Post('/signup')
  async signup(@Body() dto: CreateUserDto) {
    const user = await this.authService.signup(dto);
    await this.authService.signupMail(user.email);

    return user;
  }

  // 로그인 API
  @ApiBody({ type: LoginUserDto })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: RequestUserInterface) {
    const user = req.user;
    const token = this.authService.generateToken(user.id);

    return { user, token };
  }

  // 로그인 후, 토큰을 이용해 유저 정보 갖고오는 API
  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @Get()
  async authenticate(@Req() req: RequestUserInterface) {
    return req.user;
  }

  // 구글 로그인 API
  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  async googleLogin() {
    return HttpStatus.OK;
  }

  // 구글 로그인 API
  @UseGuards(GoogleAuthGuard)
  @Get('/google/callback')
  async googleLoginCallback(@Req() req: RequestUserInterface) {
    const { user } = req;
    const token = this.authService.generateToken(user.id);

    return { user, token };
  }

  // 카카오 로그인 API
  @UseGuards(KakaoAuthGuard)
  @Get('/kakao')
  async kakaoLogin() {
    return HttpStatus.OK;
  }

  // 카카오 로그인 API
  @UseGuards(KakaoAuthGuard)
  @Get('/kakao/callback')
  async kakaoLoginCallback(@Req() req: RequestUserInterface) {
    const user = req.user;
    const token = this.authService.generateToken(user.id);

    return { user, token };
  }

  // 네이버 로그인 API
  @Get('/naver')
  @UseGuards(NaverAuthGuard)
  async naverLogin() {
    return HttpStatus.OK;
  }

  // 네이버 로그인 API
  @Get('/naver/callback')
  @UseGuards(NaverAuthGuard)
  async naverLoginCallback(@Req() req: RequestUserInterface) {
    const user = req.user;
    const token = this.authService.generateToken(user.id);

    return { user, token };
  }

  // 이메일 인증번호 전송 API
  @Post('/email/send')
  async emailSendOTP(@Body('email') email: string) {
    return this.authService.sendEmailOTP(email);
  }

  @Post('/find/password')
  async findPassword(@Body() dto: EmailDto) {
    return await this.authService.findPasswordSendEmail(dto.email);
  }

  @Post('/change/password')
  async changePassword(@Body() dto: NewPasswordDto) {
    return await this.userService.changePasswordWithToken(
      dto.token,
      dto.password,
    );
  }
}
