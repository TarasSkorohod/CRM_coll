import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('/api');

  const configService = app.get(ConfigService);

  await app.listen(
    configService.get<string>('PORT'),
    // configService.get<string>('HOSTNAME'),
  );
}

bootstrap()
  .then(() => {
    console.log('NestJS application is running.');
  })
  .catch((error) => {
    console.error('Failed to start NestJS application:', error);
  });
