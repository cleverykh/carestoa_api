import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './core/filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Exception Filter
  app.useGlobalFilters(new AllExceptionFilter());

  //Validation Pipe
  app.useGlobalPipes(new ValidationPipe());

  //CORS
  app.enableCors();

  //Swagger
  if (process.env.NODE_ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle(process.env.APP_NAME)
      .setDescription(process.env.APP_DESC)
      .setVersion(process.env.APP_VER)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }
  await app.listen(process.env.APP_PORT);
}

bootstrap();
