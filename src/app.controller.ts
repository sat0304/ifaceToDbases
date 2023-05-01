import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getGenres(){
    return this.appService.getGenres();
  }

  @Post()
  create(@Req() req: any, @Res() res) {
    return this.appService.postData(req, res);

  }
}
