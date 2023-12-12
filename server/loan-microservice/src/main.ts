import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  app.enableCors();
  await app.listen(8020);
  console.log(`Loan Application is running on: ${await app.getUrl()}`);
}
bootstrap();
