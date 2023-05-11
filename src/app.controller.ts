import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import RabbitMQClient from './rabbitMQ/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/movies')
  async getMovies(){
    let route = {"routingKey": "getMovies"};
    return RabbitMQClient.produceMovie(route);
  }

  @Get('/movies/:kinopoiskId')
  async getMoviesByKinopoiskId(@Param('kinopoiskId') kinopoiskId: any){
    let routeById = {
      "routingKey": "getMovie", "kinopoiskId": kinopoiskId};
    return RabbitMQClient.produceMovie(routeById);
  }

  @Get('/details')
  async getDetails(){
    let route = {"routingKey": "getDetails"};
    return RabbitMQClient.produceMovie(route);
  }

  @Get('/details/:name')
  async getDetailByName(@Param('name') name: any){
    let routeByDetail = {
      "routingKey": "getDetail", "name": name};
    return RabbitMQClient.produceMovie(routeByDetail);
  }

  @Get('/genres')
  async getGenres(){
    let route = {"routingKey": "getGenres"};
    return RabbitMQClient.produceMovie(route);
  }

  @Get('/genres/:genreEng')
  async getGenreByName(@Param('genreEng') genreEng: any){
    let routeByGenre = {
      "routingKey": "getGenre", "genreEng": genreEng};
    return RabbitMQClient.produceMovie(routeByGenre);
  }

  @Get('/countries')
  async getCountries(){
    let route = {"routingKey": "getCountries"};
    return RabbitMQClient.produceMovie(route);
  }

  @Get('/countries/:countryId')
  async getCountryByName(@Param('countryId') countryId: number){
    let routeByCountry = {
      "routingKey": "getCountry", "countryId": countryId
    };
    return RabbitMQClient.produceMovie(routeByCountry);
  }

  @Get('/persons')
  async getPersons(){
    let route = {"routingKey": "getPersons"};
    return RabbitMQClient.produceMovie(route);
  }

  @Get('/persons/:personKinopoiskId')
  async getPersonsByKinopoiskId(
    @Param('personKinopoiskId') personKinopoiskId: number){
    let routeById = {
      "routingKey": "getPerson", "personKinopoiskId": personKinopoiskId};
    return RabbitMQClient.produceMovie(routeById);
  }

  @Get('/professions')
  async getProfessions(){
    let route = {"routingKey": "getProfessions"};
    return RabbitMQClient.produceMovie(route);
  }

  @Get('/professions/:profession')
  async getProfessionByName(@Param('profession') profession: any){
    let routeByProfession = {
      "routingKey": "getProfession", "profession": profession};
    return RabbitMQClient.produceMovie(routeByProfession);
  }

  @Get('/similars')
  async getSimilars(){
    let route = {"routingKey": "getSimilars"};
    return RabbitMQClient.produceMovie(route);
  }

  @Get('/similars/:similarKinopoiskId')
  async getSimilarsByKinopoiskId(
    @Param('similarKinopoiskId') similarKinopoiskId: number){
    let routeById = {
      "routingKey": "getSimilar", "similarKinopoiskId": similarKinopoiskId};
    return RabbitMQClient.produceMovie(routeById);
  }

  @Post()
  async create(@Req() req: any, @Res() res: any) {
    return this.appService.postData(req, res);

  }
}
