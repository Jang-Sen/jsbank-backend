import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { Provider } from '@user/entities/provider.enum';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@user/user.service';

@Injectable()
export class KakaoAuthStrategy extends PassportStrategy(
  Strategy,
  Provider.KAKAO,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get('KAKAO_CLIENT_ID'),
      callbackURL: configService.get('KAKAO_CALLBACK_URL'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    const { provider, username } = profile;
    const { profile_image } = profile._json.properties;
    const { email } = profile._json.kakao_account;

    try {
      // 이미 사용중인 email인지 확인
      const user = await this.userService.getUserBy('email', email);

      // DB에 저장되어 있는 email의 로그인 경로
      if (user.provider !== provider) {
        throw new HttpException(
          `You are already subscribed to ${user.provider}`,
          HttpStatus.CONFLICT,
        );
      }

      console.log('-------------------');
      done(null, user);
    } catch (e) {
      // email 확인 후 없을 경우 회원가입 진행
      const user = await this.userService.create({
        username,
        email,
        profileImg: profile_image,
        provider,
      });

      console.log('====================');
      done(null, user);
    }
  }
}
