import { ConfirmChannel } from 'amqplib';

export type ChannelReconnectCallback = (channel: ConfirmChannel) => void;
