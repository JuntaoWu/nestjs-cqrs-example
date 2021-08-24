// must be config first.
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { connect as connectToEventStore } from './services/event-store';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  await connectToEventStore();

  const config = new DocumentBuilder()
    .setTitle('Hero example')
    .setDescription('The hero API description')
    .setVersion('1.0')
    .addTag('hero')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
