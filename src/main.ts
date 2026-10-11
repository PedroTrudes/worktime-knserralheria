import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,//só permite oq foi declarado no DTO
      forbidNonWhitelisted: true,//retorna um erro se não for oq tem em DTO
      transform: false,
    })
  )

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
