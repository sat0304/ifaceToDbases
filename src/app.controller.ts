import { Controller, Get, Options, Param, Post, Req, Res } from '@nestjs/common';
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
    return await RabbitMQClient.produceMovie(route);
  }

  @ApiOperation({summary: 'To get particular movie'})
  @ApiResponse({status: 200, type: String})
  @Get('/movies/:kinopoiskId')
  async getMovieByKinopoiskId(
    @Param('kinopoiskId') kinopoiskId: number){
    let routeById = {
      "routingKey": "getMovie", 
      "kinopoiskId": kinopoiskId };
    return await RabbitMQClient.produceMovie(routeById);
  }

  @ApiOperation({summary: "To get particular movie by It's name"})
  @ApiResponse({status: 200, type: String})
  @Get('/movie/:movieName')
  async getMovieByName(
    @Param('movieName') movieName: any){
    let routeByName = {
      "routingKey": "getMovieName", 
      "movieName": movieName };
    return await RabbitMQClient.produceMovie(routeByName);
  }

  @ApiOperation({summary: "To get particular movie by It's original name"})
  @ApiResponse({status: 200, type: String})
  @Get('/movie/name/:originalName')
  async getMovieByOriginamName(
    @Param('originalName') originalName: any){
    let routeByOriginalName = {
      "routingKey": "getMovieOriginalName", 
      "originalName": originalName };
    return await RabbitMQClient.produceMovie(routeByOriginalName);
  }

  @ApiOperation({summary: "To get movies list by rate from X.X - to Y.Y"})
  @ApiResponse({status: 200, type: String})
  @Get('/movies/rate/:rateFromRateTo')
  async getMoviesByRate(
    @Param('rateFromRateTo') rateFromRateTo: any){
    let routeMovieByRate = {
      "routingKey": "getMoviesByRate", 
      "rateFromRateTo": rateFromRateTo };
    return await RabbitMQClient.produceMovie(routeMovieByRate);
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
    return await RabbitMQClient.produceMovie(route);
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
    return await RabbitMQClient.produceMovie(route);
  }

  @ApiOperation({summary: 'To get movie details'})
  @ApiResponse({status: 200, type: String})
  @Get('/movies/:kinopoiskId/details')
  async getDetails(
    @Param('kinopoiskId') kinopoiskId: number
  ){
    let route = {
      "routingKey": "getMovieDetails",
      "kinopoiskId": kinopoiskId};
    return await RabbitMQClient.produceMovie(route);
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
    return await RabbitMQClient.produceMovie(routeByDetail);
  }

  @ApiOperation({summary: 'To get genres'})
  @ApiResponse({status: 200, type: String})
  @Get('/genres')
  async getGenres(){
    let route = {"routingKey": "getGenres"};
    return await RabbitMQClient.produceMovie(route);
  }

  @ApiOperation({summary: 'To get English name of the genre'})
  @ApiResponse({status: 200, type: String})
  @Get('/genres/:genreEng')
  async getGenreByName(@Param('genreEng') genreEng: any){
    let routeByGenre = {
      "routingKey": "getGenre", 
      "genreEng": genreEng};
    return await RabbitMQClient.produceMovie(routeByGenre);
  }

  @ApiOperation({summary: 'To get the movie countries of creation'})
  @ApiResponse({status: 200, type: String})
  @Get('/movies/:kinopoiskId/countries')
  async getMovieCountries(
    @Param('kinopoiskId') kinopoiskId: number ){
    let route = {
      "routingKey": "getMovieCountries",
      "kinopoiskId": kinopoiskId,
  };
    return await RabbitMQClient.produceMovie(route);
  }

  @ApiOperation({summary: 'To get all countries'})
  @ApiResponse({status: 200, type: String})
  @Get('/countries')
  async getAllCountries(){
    let route = {"routingKey": "getAllCountries"};
    return await RabbitMQClient.produceMovie(route);
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
    return await RabbitMQClient.produceMovie(routeByCountry);
  }

  @ApiOperation({summary: 'To get the movie similars'})
  @ApiResponse({status: 200, type: String})
  @Get('/movies/:kinopoiskId/similars')
  async getSimilars(
    @Param('kinopoiskId') kinopoiskId: number ){
    let route = {
      "routingKey": "getMovieSimilars",
      "kinopoiskId": kinopoiskId };
    return await RabbitMQClient.produceMovie(route);
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
    return await RabbitMQClient.produceMovie(routeById);
  }


  @ApiOperation({summary: 'To get persons'})
  @ApiResponse({status: 200, type: String})
  @Get('/persons')
  async getPersons(){
    let route = {"routingKey": "getPersons"};
    return await RabbitMQClient.producePerson(route);
  }


  @ApiOperation({summary: 'To get certain person'})
  @ApiResponse({status: 200, type: String})
  @Get('/persons/:personKinopoiskId')
  async getPersonsByKinopoiskId(
    @Param('personKinopoiskId') personKinopoiskId: number){
    let routeById = {
      "routingKey": "getPerson", "personKinopoiskId": personKinopoiskId};
    return await RabbitMQClient.producePerson(routeById);
  }

  @ApiOperation({summary: 'To get certain person relevant movies'})
  @ApiResponse({status: 200, type: String})
  @Get('/persons/:personKinopoiskId/movies')
  async getPersonMovies(
    @Param('personKinopoiskId') personKinopoiskId: number){
    let routeById = {
      "routingKey": "getPersonMovies", "personKinopoiskId": personKinopoiskId};
    return await RabbitMQClient.produceMovie(routeById);
  }

  @ApiOperation({summary: "To get person's occupations"})
  @ApiResponse({status: 200, type: String})
  @Get('/persons/:personKinopoiskId/professions')
  async getPersonProfessions(
    @Param('personKinopoiskId') personKinopoiskId: number){
    let routeById = {
      "routingKey": "getPersonProfessions",
      "personKinopoiskId": personKinopoiskId};
    return await RabbitMQClient.producePerson(routeById);
  }

  @ApiOperation({summary: 'To get list of professions'})
  @ApiResponse({status: 200, type: String})
  @Get('/professions')
  async getProfessions(){
    let route = {"routingKey": "getProfessions"};
    return await RabbitMQClient.producePerson(route);
  }

  @ApiOperation({summary: 'To get particular profession'})
  @ApiResponse({status: 200, type: String})
  @Get('/professions/:profession')
  async getProfessionByName(@Param('profession') profession: any){
    let routeByProfession = {
      "routingKey": "getProfession", "profession": profession};
    return await RabbitMQClient.producePerson(routeByProfession);
  }

  @ApiOperation({summary: 'To get list of reviews'})
  @ApiResponse({status: 200, type: String})
  @Get('/reviews')
  async getReviews(){
    let route = {"routingKey": "getReviews"};
    return await RabbitMQClient.produceReview(route);
  }

  @ApiOperation({summary: 'To get particular review'})
  @ApiResponse({status: 200, type: String})
  @Get('/reviews/:reviewId')
  async getReviewById(
    @Param('reviewId') reviewId: number){
    let routeById = {
      "routingKey": "getReview", "reviewId": reviewId};
    return await RabbitMQClient.produceReview(routeById);
  }

  @ApiOperation({summary: 'To get the review comments'})
  @ApiResponse({status: 200, type: String})
  @Get('/reviews/:reviewId/comments')
  async getComments(
    @Param('reviewId') reviewId: number){
    let route = {"routingKey": "getComments", "reviewId": reviewId};
    return await RabbitMQClient.produceReview(route);
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
    return await RabbitMQClient.produceReview(routeById);
  }
  
  @ApiOperation({summary: 'Create new movie, person or review'})
  @ApiResponse({status: 201, type: String})
  @Post()
  async create(@Req() req: any, @Res() res: any) {
    return await this.appService.postData(req, res);

  }

  @ApiOperation({summary: 'Get list of methods'})
  @ApiResponse({status: 200, type: String})
  @Options()
  async returnListMethods() {
    return 'GET, OPTIONS, POST, PATCH';
  }
}
