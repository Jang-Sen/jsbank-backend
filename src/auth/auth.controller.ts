import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { RequestUserInterface } from './interface/requestUser.interface';
import { TokenGuard } from './guard/token.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../user/dto/login-user.dto';

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
}
