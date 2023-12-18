import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

  async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.TCP,
      options: {
        host: 'localhost', //'business',
        port: 8888,
      },
    });
    app.listen();
    console.log('Business microservice is listening');
  }
  bootstrap();