import { Channel, Connection, connect } from "amqplib";
import config from "../config";
import Consumer from "./consumer";
import Producer from "./producer";
import { EventEmitter } from "events";

class RabbitMQClient {

    private constructor() {};

    private static instance: RabbitMQClient;
    private isInitialized = false;

    private consumerPerson: Consumer;
    private producerPerson: Producer;
    private connectionPerson: Connection;
    private consumerChannelPerson: Channel;
    private producerChannelPerson: Channel;
    private eventEmitterPerson: EventEmitter;

    private consumerMovie: Consumer;
    private producerMovie: Producer;
    private connectionMovie: Connection;
    private consumerChannelMovie: Channel;
    private producerChannelMovie: Channel;
    private eventEmitterMovie: EventEmitter;

    public static getInstance() {
        if (!this.instance) {
            this.instance = new RabbitMQClient();
        }
        return this.instance;
    }

    async initialize() {
        if (this.isInitialized) {
            return;
        }
        try {
            this.connectionPerson = await connect(config.rabbitMQ.url);
            this.connectionMovie = await connect(config.rabbitMQ.url);

            this.producerChannelPerson = await this.connectionPerson.createChannel();
            this.consumerChannelPerson = await this.connectionPerson.createChannel();

            this.producerChannelMovie = await this.connectionMovie.createChannel();
            this.consumerChannelMovie = await this.connectionMovie.createChannel();

            const {queue: replyQueueNamePerson} = await this.consumerChannelPerson.assertQueue(
                config.rabbitMQ.queues.clientPersonQueue,
                );

            const {queue: replyQueueNameMovie} = await this.consumerChannelMovie.assertQueue(
                config.rabbitMQ.queues.clientMovieQueue,
                );

            this.eventEmitterPerson = new EventEmitter();
            this.eventEmitterMovie = new EventEmitter();

            this.consumerPerson = new Consumer(
                this.consumerChannelPerson,
                replyQueueNamePerson,
                this.eventEmitterPerson);
            this.producerPerson = new Producer(
                this.producerChannelPerson,
                config.rabbitMQ.queues.clientPersonQueue,
                config.rabbitMQ.queues.serverPersonQueue,
                replyQueueNamePerson,
                this.eventEmitterPerson);

            this.consumerMovie = new Consumer(
                this.consumerChannelMovie,
                replyQueueNameMovie,
                this.eventEmitterMovie);
            this.producerMovie = new Producer(
                this.producerChannelMovie,
                config.rabbitMQ.queues.clientMovieQueue,
                config.rabbitMQ.queues.serverMovieQueue,
                replyQueueNameMovie,
                this.eventEmitterMovie);

            this.consumerPerson.consumeMessages();
            this.consumerMovie.consumeMessages();

            this.isInitialized = true;

        } catch(error) {
            console.log('rabbitMQ error ...', error);
        }
    }
    async producePerson(data: any) {
        if (!this.isInitialized) {
            await this.initialize();
        }
        return await this.producerPerson.produceMessages(data);
    }
    async produceMovie(data: any) {
        if (!this.isInitialized) {
            await this.initialize();
        }
        return await this.producerMovie.produceMessages(data);
    }
}

export default RabbitMQClient.getInstance();