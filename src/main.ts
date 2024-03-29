import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ImATeapotException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelist = 'http://localhost:3000';

  app.enableCors({
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
    origin: function (origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (whitelist.includes(origin)) {
        callback(null, true);
      } else {
        console.log('not alowwed');
        callback(new ImATeapotException('not allowed'), false);
      }
    },
  });
  await app.listen(8080);
}
bootstrap();
