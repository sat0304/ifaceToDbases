import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import RabbitMQClient from './rabbitMQ/client';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  RabbitMQClient.initialize();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Movie database')
  .setDescription('The database contains general\
  information of movies, actors, producers and etc...')
  .addTag('ivilike')
  .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(3000);
  console.log('Server is running at port 3000');



}
bootstrap();
