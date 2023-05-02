import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import RabbitMQClient from './rabbitMQ/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/genres')
  async getGenres(){
    let route = {"routingKey": "getGenres"};
    return RabbitMQClient.produceMovie(route);
  }

  @Get('/genres/:id')
  async getById(@Param('id') id: number){
    let routeById = {"routingKey": "getGenre", "id": id};
    return RabbitMQClient.produceMovie(routeById);
  }

  @Post()
  async create(@Req() req: any, @Res() res: any) {
    return this.appService.postData(req, res);

  }
}
