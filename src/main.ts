import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // prefijo de la ruta
  app.setGlobalPrefix('api/v1');

  // validacion de datos que llegan a los controladores
  // npm i class-validator class-transformer

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // solo se aceptan los campos que esten definidos en el DTO
      forbidNonWhitelisted: true, // rechaza los campos que no esten definidos en el DTO
      transform: true, // convierte los tipos de datos a los que estan definidos en el DTO
    }),
  );

  await app.listen(3000);
}
bootstrap();
