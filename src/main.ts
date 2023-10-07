import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as compression from 'compression';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { API_PREFIX_PATH, PORT } from '@configs/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Enable CORS
  app.enableCors();

  // Apply middleware helmet
  // app.use(helmet());

  // Apply middleware compression
  app.use(compression());

  app.setGlobalPrefix(API_PREFIX_PATH);

  await app.listen(PORT);
  Logger.log(`http://localhost:${PORT}${API_PREFIX_PATH}`);
}
bootstrap();
