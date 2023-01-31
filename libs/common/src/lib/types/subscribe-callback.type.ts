import { ConsumeMessage } from 'amqplib';

export type SubscribeCallback = (msg: ConsumeMessage | null) => any;
