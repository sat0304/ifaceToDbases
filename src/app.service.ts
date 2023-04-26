import { Injectable, Req, Res } from '@nestjs/common';
// import { CreateDto } from './dto/createDto';
import RabbitMQClient from './rabbitMQ/client';

// const rabbitClient = new RabbitMQClient();

@Injectable()
export class AppService {
  getHello(): string {
    return '{"strType" : "Hello World!", "counter": 2, "numOfstr": 3}';
  }
  

  async postData(@Req() req, @Res() res) {
    const body = req.body;
    // RabbitMQClient.initialize();
    // console.log(body.routingKey);
    switch (body.routingKey) {
      case 'postPerson': 
        let resultPerson = await RabbitMQClient.producePerson(body);
        res.send({resultPerson});
      break;
      case 'postMovie':
        let resultMovie = await RabbitMQClient.produceMovie(body);
        res.send({resultMovie});
      break;
      default: let result = 0;
      res.send({result});
      break;
  }
    // console.log('This is service module working wtih status: 200');
    
    
    // return res.sendStatus(200);
}
}