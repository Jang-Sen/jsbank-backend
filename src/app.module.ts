import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { BankModule } from '@bank/bank.module';
import { DataBaseModule } from '@db/db.module';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { MailModule } from '@mail/mail.module';
import { MailService } from '@mail/mail.service';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { RedisModule } from './redis/redis.module';
import { AgreeOfTermModule } from './agree-of-term/agree-of-term.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3307,
    //   username: 'root',
    //   password: 'pass_js',
    //   database: 'db_js',
    //   entities: [],
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MYSQL_HOST: Joi.string().required(),
        // MYSQL_USER: Joi.string().required(),
        MYSQL_ROOT_PASSWORD: Joi.string().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().required(),
        MYSQL_DATABASE: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        // REDIS_USER: Joi.string().required(),
        // REDIS_PASSWORD: Joi.string().required(),
        REDIS_TTL: Joi.number().required(),

        MAIL_SERVICE: Joi.string().required(),
        MAIL_USER: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),

        FIND_PASSWORD_TOKEN_SECRET: Joi.string().required(),
        FIND_PASSWORD_TOKEN_TIME: Joi.string().required(),
        EMAIL_BASE_URL: Joi.string().required(),

        TOKEN_SECRET: Joi.string().required(),
        TOKEN_TIME: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_TIME: Joi.string().required(),

        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_CALLBACK_URL: Joi.string().required(),
        KAKAO_CLIENT_ID: Joi.string().required(),
        KAKAO_CALLBACK_URL: Joi.string().required(),
        NAVER_CLINET_ID: Joi.string().required(),
        NAVER_CLINET_SECRET: Joi.string().required(),
        NAVER_CALLBACK_URL: Joi.string().required(),
      }),
      envFilePath: '.env', // .env 파일의 경로를 명시적으로 추가
      isGlobal: true, // 모든 모듈에서 ConfigService 사용 가능하게 함
    }),
    BankModule,
    DataBaseModule,
    UserModule,
    AuthModule,
    MailModule,
    RedisModule,
    AgreeOfTermModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
