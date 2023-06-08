import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import RabbitMQClient from './rabbitMQ/client';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({summary: 'To get all movies'})
  @ApiResponse({status: 200, type: String})
  @Get('/movies')
  async getMovies(){
    let route = {"routingKey": "getMovies"};
    return RabbitMQClient.produceMovie(route);
  }

  @ApiOperation({summary: 'To get particular movie'})
  @ApiResponse({status: 200, type: String})
  @Get('/movies/:kinopoiskId')
  async getMoviesByKinopoiskId(
    @Param('kinopoiskId') kinopoiskId: number){
    let routeById = {
      "routingKey": "getMovie", 
      "kinopoiskId": kinopoiskId };
    return RabbitMQClient.produceMovie(routeById);
  }

  @ApiOperation({summary: 'To get movie cast'})
  @ApiResponse({status: 200, type: String})
  @Get('/movies/:kinopoiskId/actors')
  async getMovieActors(
    @Param('kinopoiskId') kinopoiskId: number ){
    let route = {
      "routingKey": "getMovieActors",
      "kinopoiskId": kinopoiskId 
    };
    return RabbitMQClient.produceMovie(route);
  }

  @ApiOperation({summary: 'To get movie makers'})
  @ApiResponse({status: 200, type: String})
  @Get('/movies/:kinopoiskId/persons')
  async getMoviePersons(
    @Param('kinopoiskId') kinopoiskId: number ){
    let route = {
      "routingKey": "getMoviePersons",
      "kinopoiskId": kinopoiskId 
    };
    return RabbitMQClient.produceMovie(route);
  }

  @ApiOperation({summary: 'To get movie details'})
  @ApiResponse({status: 200, type: String})
  @Get('/movies/:kinopoiskId/details')
  async getDetails(
    @Param('kinopoiskId') kinopoiskId: number
  ){
    let route = {
      "routingKey": "getDetails",
      "kinopoiskId": kinopoiskId};
    return RabbitMQClient.produceMovie(route);
  }

  @ApiOperation({summary: 'To get the movie particular detail like the rating'})
  @ApiResponse({status: 200, type: String})
  @Get('/movies/:kinopoiskId/details/:name')
  async getDetailByName(
    @Param('kinopoiskId') kinopoiskId: number,
    @Param('name') name: any){
    let routeByDetail = {
      "routingKey": "getDetail",
      "kinopoiskId": kinopoiskId,
      "name": name};
    return RabbitMQClient.produceMovie(routeByDetail);
  }

  @ApiOperation({summary: 'To get genres'})
  @ApiResponse({status: 200, type: String})
  @Get('/genres')
  async getGenres(){
    let route = {"routingKey": "getGenres"};
    return RabbitMQClient.produceMovie(route);
  }

  @ApiOperation({summary: 'To get English name of the genre'})
  @ApiResponse({status: 200, type: String})
  @Get('/genres/:genreEng')
  async getGenreByName(@Param('genreEng') genreEng: any){
    let routeByGenre = {
      "routingKey": "getGenre", 
      "genreEng": genreEng};
    return RabbitMQClient.produceMovie(routeByGenre);
  }

  @ApiOperation({summary: 'To get the movie countries of creation'})
  @ApiResponse({status: 200, type: String})
  @Get('/movies/:kinopoiskId/countries')
  async getCountries(
    @Param('kinopoiskId') kinopoiskId: number ){
    let route = {
      "routingKey": "getCountries",
      "kinopoiskId": kinopoiskId,
  };
    return RabbitMQClient.produceMovie(route);
  }

  @ApiOperation({summary: 'To get the movie particular country'})
  @ApiResponse({status: 200, type: String})
  @Get('/movies/:kinopoiskId/countries/:countryId')
  async getCountryByName(
    @Param('kinopoiskId') kinopoiskId: number,
    @Param('countryId') countryId: number){
    let routeByCountry = {
      "routingKey": "getCountry", 
      "kinopoiskId": kinopoiskId,
      "countryId": countryId
    };
    return RabbitMQClient.produceMovie(routeByCountry);
  }

  @ApiOperation({summary: 'To get the movie similars'})
  @ApiResponse({status: 200, type: String})
  @Get('/movies/:kinopoiskId/similars')
  async getSimilars(
    @Param('kinopoiskId') kinopoiskId: number ){
    let route = {
      "routingKey": "getSimilars",
      "kinopoiskId": kinopoiskId };
    return RabbitMQClient.produceMovie(route);
  }

  @ApiOperation({summary: 'To get the movie particular similar'})
  @ApiResponse({status: 200, type: String})
  @Get('/movies/:kinopoiskId/similars/:similarKinopoiskId')
  async getSimilarsByKinopoiskId(
    @Param('similarKinopoiskId') similarKinopoiskId: number,
    @Param('kinopoiskId') kinopoiskId: number){
    let routeById = {
      "routingKey": "getSimilar", 
      "kinopoiskId": kinopoiskId,
      "similarKinopoiskId": similarKinopoiskId};
    return RabbitMQClient.produceMovie(routeById);
  }


  @ApiOperation({summary: 'To get persons'})
  @ApiResponse({status: 200, type: String})
  @Get('/persons')
  async getPersons(){
    let route = {"routingKey": "getPersons"};
    return RabbitMQClient.producePerson(route);
  }


  @ApiOperation({summary: 'To get certain person'})
  @ApiResponse({status: 200, type: String})
  @Get('/persons/:personKinopoiskId')
  async getPersonsByKinopoiskId(
    @Param('personKinopoiskId') personKinopoiskId: number){
    let routeById = {
      "routingKey": "getPerson", "personKinopoiskId": personKinopoiskId};
    return RabbitMQClient.producePerson(routeById);
  }

  @ApiOperation({summary: 'To get certain person relevant movies'})
  @ApiResponse({status: 200, type: String})
  @Get('/persons/:personKinopoiskId/movies')
  async getPersonMovies(
    @Param('personKinopoiskId') personKinopoiskId: number){
    let routeById = {
      "routingKey": "getPersonMovies", "personKinopoiskId": personKinopoiskId};
    return RabbitMQClient.produceMovie(routeById);
  }

  @ApiOperation({summary: 'To get list of professions'})
  @ApiResponse({status: 200, type: String})
  @Get('/professions')
  async getProfessions(){
    let route = {"routingKey": "getProfessions"};
    return RabbitMQClient.producePerson(route);
  }

  @ApiOperation({summary: 'To get particular profession'})
  @ApiResponse({status: 200, type: String})
  @Get('/professions/:profession')
  async getProfessionByName(@Param('profession') profession: any){
    let routeByProfession = {
      "routingKey": "getProfession", "profession": profession};
    return RabbitMQClient.producePerson(routeByProfession);
  }

  @ApiOperation({summary: 'To get list of reviews'})
  @ApiResponse({status: 200, type: String})
  @Get('/reviews')
  async getReviews(){
    let route = {"routingKey": "getReviews"};
    return RabbitMQClient.produceReview(route);
  }

  @ApiOperation({summary: 'To get particular review'})
  @ApiResponse({status: 200, type: String})
  @Get('/reviews/:reviewId')
  async getReviewById(
    @Param('reviewId') reviewId: number){
    let routeById = {
      "routingKey": "getReview", "reviewId": reviewId};
    return RabbitMQClient.produceReview(routeById);
  }

  @ApiOperation({summary: 'To get the review comments'})
  @ApiResponse({status: 200, type: String})
  @Get('/reviews/:reviewId/comments')
  async getComments(
    @Param('reviewId') reviewId: number){
    let route = {"routingKey": "getComments", "reviewId": reviewId};
    return RabbitMQClient.produceReview(route);
  }

  @ApiOperation({summary: 'To get the review particular comment'})
  @ApiResponse({status: 200, type: String})
  @Get('/reviews/:reviewId/:commentId')
  async getCommentById(
    @Param('reviewId') 
    reviewId: number,
    @Param('commentId')
    commentId: number){
    let routeById = {
      "routingKey": "getComment", 
      "reviewId": reviewId,
      "commentId": commentId};
    return RabbitMQClient.produceReview(routeById);
  }
  
  @ApiOperation({summary: 'Create new movie, person or review'})
  @ApiResponse({status: 201, type: String})
  @Post()
  async create(@Req() req: any, @Res() res: any) {
    return this.appService.postData(req, res);

  }
}
