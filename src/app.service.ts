import { Injectable, Req, Res } from '@nestjs/common';
// import { CreateDto } from './dto/createDto';
import RabbitMQClient from './rabbitMQ/client';

let route = {"routingKey": "getGenres"};
let routeByValue = {"routingKey": "getGenre", "value": "id"};

@Injectable()
export class AppService {

  async getGenres() {
    return RabbitMQClient.produceMovie(route);
  }

  // async getGenreByValue() {
  //   return RabbitMQClient.produceMovie(routeByValue);
  // }
  

  async postData(@Req() req: any, @Res() res: any) {
    const body = req.body;
    // RabbitMQClient.initialize();
    // console.log(body.routingKey);
    switch (body.routingKey) {
      case 'getGenre': 
      let resultGetGenre = await RabbitMQClient.producePerson(body);
      res.send({resultGetGenre});
      break;
      case 'postPerson': 
        let resultPerson = await RabbitMQClient.producePerson(body);
        res.send({resultPerson});
      break;
      case 'postMovie':
        let resultMovie = await RabbitMQClient.produceMovie(body);
        res.send({resultMovie});
      break;
      case 'postGenre':
        let resultGenre = await RabbitMQClient.produceMovie(body);
        res.send({resultGenre});
      break;
      default: let result = 0;
      res.send({result});
      break;
    }
  }
}
