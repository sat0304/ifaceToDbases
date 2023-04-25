import { Channel} from "amqplib";
import config from "../config";
import { EventEmitter } from "events";
// import { randomUUID } from "crypto";

export default class Producer {
    constructor(
        private channel: Channel,
        private replyQueueName: string,
        private eventEmitter: EventEmitter){}

    async produceMessages(data: any){
        // const uuid = randomUUID();
        const uuid = config.rabbitMQ.queues.clientQueue;
        console.log('the correlation ID is ...', uuid);
        this.channel.sendToQueue(
            config.rabbitMQ.queues.rpcQueue,
            Buffer.from(JSON.stringify(data)), {
                replyTo: this.replyQueueName,
                correlationId: uuid,
                expiration: 8,
                headers: {
                    function: data.operation
                }
            }
        );
        // wait for response
        return new Promise((resolve, reject)=> {
          this.eventEmitter.once(uuid, async (msg) => {
            const reply = JSON.parse(msg.content.toString());
            console.log('The event has got from server...', reply);
            resolve(reply);
            });
        });
   
    }
}