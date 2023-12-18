import { NestFactory } from '@nestjs/core';
import { Logger , ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

  async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.TCP,
      options: {
        host: 'loans', //'localhost',
        port: 8889,
      },
    });
    app.listen();
    console.log('Loan microservice is listening');
  }
  bootstrap();