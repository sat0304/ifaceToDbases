import { Channel, ConsumeMessage } from "amqplib";
import { EventEmitter } from "events";

export default class Consumer {
    constructor(
        private channel: Channel,
        private replyQueueName: string,
        private eventEmitter: EventEmitter){}

    async consumeMessages(){
        console.log('This is iface side to consume');
        this.channel.consume(
            this.replyQueueName,
            async (message: ConsumeMessage) => {
            // console.log('the reply is ...',
            // JSON.parse(message.content.toString()));
            this.eventEmitter.emit(
                message.properties.correlationId.toString(),
                message
                );
            },
        {
            noAck: true,
        }
        );
    }
}
