import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { AppModule } from '@root/app.module';
import { TransformInterceptor } from '@root/common/interceptor/transform.interceptor';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix('api'); // url api 추가
  app.use(cookieParser()); // cookie 적용
  app.enableCors(); // 허용된 ip 만 접속 가능하도록 설정

  // url 버저닝 적용
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // port
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get('BACKEND_PORT');

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('js_bank_api')
    .setDescription('js_bank_api')
    .addBearerAuth()
    .addServer('/api')
    .setVersion('1.0')
    .addTag('bank')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Validation 설정
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      transform: true,
    }),
  );

  // Interceptor 설정
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(port);
}

bootstrap();
