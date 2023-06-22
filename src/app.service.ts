import { Injectable, Req, Res } from '@nestjs/common';
import RabbitMQClient from './rabbitMQ/client';


@Injectable()
export class AppService {

  async postData(@Req() req: any, @Res() res: any) {
    const body = req.body;
    switch (body.routingKey) {
      // case 'postGenre':
      //   let resultGenre = await RabbitMQClient.produceMovie(body);
      //   res.set('Access-Control-Allow-Methods', 'POST, PATCH, GET, OPTIONS');
      //   res.set('Access-Control-Allow-Origin', '*');
      //   res.send({resultGenre});
      // break;
      case 'postPerson': 
        let resultPerson = await RabbitMQClient.producePerson(body);
        await res.set('Access-Control-Allow-Methods', 'POST, PATCH, GET, OPTIONS');
        await res.set('Access-Control-Allow-Origin', '*');
        await res.send({resultPerson});
      break;
      case 'postMovie':
        let resultMovie = await RabbitMQClient.produceMovie(body);
        await res.set('Access-Control-Allow-Methods', 'POST, PATCH, GET, OPTIONS');
        await res.set('Access-Control-Allow-Origin', '*');
        await res.send({resultMovie});
      break;
      case 'postReview':
        let resultReview = await RabbitMQClient.produceReview(body);
        await res.set('Access-Control-Allow-Methods', 'POST, PATCH, GET, OPTIONS');
        await res.set('Access-Control-Allow-Origin', '*');
        await res.send({resultReview});
      break;
      case 'postComment':
        let resultComment = await RabbitMQClient.produceReview(body);
        await res.set('Access-Control-Allow-Methods', 'POST, PATCH, GET, OPTIONS');
        await res.set('Access-Control-Allow-Origin', '*');
        await res.send({resultComment});
      break;
      
      default: let result = 0;
      await res.send({result});
      break;
    }
  }
}
