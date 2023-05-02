import { Injectable, Req, Res } from '@nestjs/common';
import RabbitMQClient from './rabbitMQ/client';


@Injectable()
export class AppService {

  async postData(@Req() req: any, @Res() res: any) {
    const body = req.body;
    switch (body.routingKey) {
      // case 'getGenre': 
      // let resultGetGenre = await RabbitMQClient.produceMovie(body);
      // res.send({resultGetGenre});
      // break;
      case 'postGenre':
        let resultGenre = await RabbitMQClient.produceMovie(body);
        res.send({resultGenre});
      break;
      case 'postPerson': 
        let resultPerson = await RabbitMQClient.producePerson(body);
        res.send({resultPerson});
      break;
      case 'postMovie':
        let resultMovie = await RabbitMQClient.produceMovie(body);
        res.send({resultMovie});
      break;
      case 'postReview':
        let resultReview = await RabbitMQClient.produceReview(body);
        res.send({resultReview});
      break;
      default: let result = 0;
      res.send({result});
      break;
    }
  }
}
