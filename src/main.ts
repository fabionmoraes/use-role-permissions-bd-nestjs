import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { PrismaClient } from './shared/prismaClient';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // enable shutdown hook
  const prismaService: PrismaClient = app.get(PrismaClient);
  prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
