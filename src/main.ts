import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@root/app.module';
import { TransformInterceptor } from '@root/common/interceptor/transform.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // url api 추가
  app.use(cookieParser());

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('js_bank_api')
    .setDescription('js_bank_api')
    .addBearerAuth()
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

  await app.listen(8011);
}

bootstrap();
