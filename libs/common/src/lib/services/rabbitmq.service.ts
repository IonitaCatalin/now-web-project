import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { RabbitMQUtil } from "../utils";
import { ConfirmChannel, Connection, ConsumeMessage, Options } from 'amqplib';
import { ChannelReconnectCallback } from "../types";

@Injectable()
export class RabbitMQService implements OnModuleDestroy {

    protected readonly rabbitMq = RabbitMQUtil.getInstance();

    public connect(): Promise<Connection | null> {
        return this.rabbitMq.connect();
      }
    
    async onModuleDestroy(): Promise<void> {
        await this.close();
    }

    public publish<T>(queueName: string, message: T): Promise<boolean> {
        return this.rabbitMq.publish<T>(queueName, message);
    }

    public subscribe(
        queueName: string,
        callback: (msg: ConsumeMessage | null) => any,
        queueOptions: Options.AssertQueue | null = null,
        consumeOptions: Options.Consume | null = null,
        reconnectCallback: ChannelReconnectCallback | null = null,
      ): Promise<ConfirmChannel | null> {
        return this.rabbitMq.subscribe(queueName, callback, queueOptions, consumeOptions, reconnectCallback);
    }

    public async close(): Promise<void> {
        await this.rabbitMq.close();
    }
}
