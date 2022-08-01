/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Our API will be globally prefixed with 'api': https://docs.nestjs.com/faq/global-prefix#global-prefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // How versioning can be handled: https://docs.nestjs.com/techniques/versioning
  // Version will default to prefixing with 'v'.
  // ex. '/api/v1/movies'
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
