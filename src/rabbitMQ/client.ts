import { Channel, Connection, connect } from "amqplib";
import config from "../config";
import Consumer from "./consumer";
import Producer from "./producer";
import { EventEmitter } from "events";

class RabbitMQClient {

    private constructor() {};

    private static instance: RabbitMQClient;
    private isInitialized = false;

    private consumer: Consumer;
    private producer: Producer;

    private connection: Connection;

    private consumerChannel: Channel;
    private producerChannel: Channel;

    private  eventEmitter: EventEmitter;

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
            this.connection = await connect(config.rabbitMQ.url);

            this.producerChannel = await this.connection.createChannel();
            this.consumerChannel = await this.connection.createChannel();

            // const {queue: replyQueueName} = await this.consumerChannel.assertQueue('');
            const {queue: replyQueueName} = await this.consumerChannel.assertQueue(
                config.rabbitMQ.queues.clientQueue,
                // {exclusive: true}
                );

            this.eventEmitter = new EventEmitter();
            
            this.consumer = new Consumer(
                this.consumerChannel,
                replyQueueName,
                this.eventEmitter);
            this.producer = new Producer(
                this.producerChannel,
                replyQueueName,
                this.eventEmitter);

            this.consumer.consumeMessages();

            this.isInitialized = true;

        } catch(error) {
            console.log('rabbitMQ error ...', error);
        }
    }
    async produce(data: any) {
        if (!this.isInitialized) {
            await this.initialize();
        }
        return await this.producer.produceMessages(data);
    }
}

export default RabbitMQClient.getInstance();