import { ConfirmChannel } from 'amqplib';

export type ChannelConsumeCallback = () => Promise<ConfirmChannel | null>;
