import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@user/entities/provider.enum';
import { UserService } from '@user/user.service';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(
  Strategy,
  Provider.GOOGLE,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['profile', 'email'],
      // passReqToCallback: true,
    });
  }

  // 로직
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { provider, displayName, email, picture } = profile;

    try {
      // 이메일이 이미 사용중인 이메일인지 먼저 체크
      const user = await this.userService.getUserBy('email', email);

      if (user.provider !== provider) {
        // 이미 계정이 다른 곳에서 생성된 상태일 때 에러를 던짐
        throw new HttpException(
          `You are already subscribed to ${user.provider}`, // 이미 생성된 계정의 연동 상태를 표시
          HttpStatus.CONFLICT, // HTTP 409 에러
        );
      }

      console.log('----------------------------');
      done(null, user);
    } catch (e) {
      // 회원가입 로직
      if (e.status === 404) {
        const user = await this.userService.create({
          email,
          username: displayName,
          profileImg: picture,
          provider,
        });

        console.log('+++++++++++++++++++++');
        done(null, user);
      }
    }
  }
}
