import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import RabbitMQClient from './rabbitMQ/client';


async function bootstrap() {
  RabbitMQClient.initialize();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Server is running at port 3000');

}
bootstrap();
