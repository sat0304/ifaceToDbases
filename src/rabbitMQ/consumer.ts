import { Channel, ConsumeMessage } from "amqplib";

export default class Consumer {
    constructor( private channel: Channel, private replyQueueName: string ){}

    async consumeMessages(){
        console.log('This is iface side to consume');
        this.channel.consume(
            this.replyQueueName,
            async (message: ConsumeMessage) => {
            console.log('the reply is ...',
            JSON.parse(message.content.toString()));
        },
        {
            noAck: true,
        }
        );
    }
}
