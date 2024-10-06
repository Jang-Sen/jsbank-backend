import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BankModule } from './bank/bank.module';
import { DataBaseModule } from './db/db.module';
import * as Joi from '@hapi/joi';

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
        MYSQL_USER: Joi.string().required(),
        MYSQL_ROOT_PASSWORD: Joi.string().required(),
        MYSQL_DATABASE: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
      }),
      envFilePath: '.env', // .env 파일의 경로를 명시적으로 추가
      isGlobal: true, // 모든 모듈에서 ConfigService 사용 가능하게 함
    }),
    BankModule,
    DataBaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
