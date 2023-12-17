import { NestFactory } from '@nestjs/core';
import { Logger , ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

/*   async function bootstrap() {
    const port = process.env.PORT ? Number(process.env.PORT) : 8000;
    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port,
      },
    });
    app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
    await app.listen();
    console.log('Business Microservice listening on port:', port);
  }
  bootstrap(); */

  // const logger = new Logger();

  async function bootstrap() {
/*     const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
    app.enableCors();
    await app.listen(3000);
    console.log(`Business HTTP service is running on: ${await app.getUrl()}`); */
    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 8889,
      },
    });
    app.listen();
    console.log('Loan microservice is listening');
  }
  bootstrap();