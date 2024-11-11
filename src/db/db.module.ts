import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // type: 'mysql',
      // host: 'localhost',
      // port: 3307,
      // username: 'root',
      // password: 'pass_js',
      // database: 'db_js',
      // entities: [],
      // autoLoadEntities: true,
      // synchronize: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (c: ConfigService) => ({
        type: 'mysql',
        host: c.get('MYSQL_HOST'),
        port: c.get('MYSQL_PORT'),
        username: c.get('MYSQL_USER'),
        password: c.get('MYSQL_PASSWORD'),
        database: c.get('MYSQL_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DataBaseModule {}
