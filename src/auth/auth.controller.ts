import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@auth/auth.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { LocalAuthGuard } from '@auth/guard/local-auth.guard';
import { RequestUserInterface } from '@auth/interface/requestUser.interface';
import { TokenGuard } from '@auth/guard/token.guard';
import { LoginUserDto } from '@user/dto/login-user.dto';
import { GoogleAuthGuard } from '@auth/guard/google-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  // 구글 로그인 후 API
  @UseGuards(GoogleAuthGuard)
  @Get('/google/callback')
  async googleLoginCallback(@Req() req: RequestUserInterface) {
    return req.user;
  }
}
