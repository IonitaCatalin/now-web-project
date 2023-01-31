import { Logger } from '@nestjs/common';
import { ConfirmChannel, connect, Connection, Options } from 'amqplib';
import { IExceptionCallBackFormat } from '../interfaces';
import { ChannelConsumeCallback, ChannelReconnectCallback, SubscribeCallback, ChannelHandleError } from '../types';
import { TimeoutUtil } from './timeout.util';

export class RabbitMQUtil {

    private static instance: RabbitMQUtil | null = null;
    private connection: Connection | null = null;
    private reconnect: boolean;
    private connecting = false;
    private subscriptionReconnectTimeout = 1000

    private logger: Logger = new Logger(RabbitMQUtil.name);
  
    constructor(reconnect = false) {
      this.reconnect = reconnect;
    }

    public static unhandledRejection(error: IExceptionCallBackFormat): void {
      if (error?.port === 5672 || ['EPIPE', 'ECONNRESET'].includes(error?.errno || '')) {
        process.exit(1);
      } else if (error?.message === 'Socket closed abruptly during opening handshake') {
        process.exit(1);
      }
    }
  
    public static getInstance(): RabbitMQUtil {
      if (RabbitMQUtil.instance === null) {
        RabbitMQUtil.instance = new RabbitMQUtil();
      }
  
      return RabbitMQUtil.instance;
    }
  
    public async connect(): Promise<Connection | null> {
      if (this.hasConnection()) {
        return this.getConnection();
      }
  
      if (this.isConnecting()) {
        do {
          await TimeoutUtil.wait(1000); // 1 sec
        } while (this.isConnecting());
  
        if (this.hasConnection()) {
          return this.getConnection();
        }
      }
  
      this.setConnecting(true);
  
      try {
        this.connection = await connect(this.getConnectParameters());
        this.setConnecting(false);
  
        this.connection.on('close', this.handleConnectionClose.bind(this));
        this.connection.on('error', this.handleConnectionError.bind(this));
      } catch (err) {
        this.logger.error(`Error on connecting to RabbitMQ: ${err.message} (${JSON.stringify(err)})`);
        this.setConnecting(false);
  
        throw err;
      }
  
      return this.connection;
    }
  
    public async createChannel(): Promise<ConfirmChannel | null> {
      if (!this.hasConnection()) {
        return null;
      }
  
      return (await this.getConnection()?.createConfirmChannel()) || null;
    }
  
    public async close(): Promise<void> {
      this.reconnect = false;
  
      if (this.connection !== null) {
        await this.connection.close();
        this.connection = null;
      }
    }
  
    public async subscribe(
      queueName: string,
      callback: SubscribeCallback,
      queueOptions: Options.AssertQueue | null = null,
      consumeOptions: Options.Consume | null = null,
      reconnectCallback: ChannelReconnectCallback | null = null,
    ): Promise<ConfirmChannel | null> {
      await this.connect();
  
      if (!this.hasConnection()) {
        return null;
      }
  
      const consume: ChannelConsumeCallback = async (): Promise<ConfirmChannel | null> => {
        const channel = await this.createChannel();
  
        channel?.on('error', this.handleChannelError(consume, reconnectCallback).bind(this));
  
        await channel?.assertQueue(queueName, {
          autoDelete: false,
          durable: true,
          ...(queueOptions || {}),
          arguments: {
            'x-queue-type': 'quorum',
            ...(queueOptions?.arguments || {}),
          },
        });
        await channel?.prefetch(1);
  
        const queueConsumeOptions: Options.Consume = {
          noAck: false,
          ...(consumeOptions || {}),
        };
        await channel?.consume(queueName, callback, queueConsumeOptions);
  
        return channel;
      };
  
      return await consume();
    }
  
    public async publish<T>(queueName: string, message: T): Promise<boolean> {
      await this.connect();
  
      if (!this.hasConnection()) {
        return false;
      }
  
      const channel = await this.createChannel();
  
      await channel?.assertQueue(queueName, {
        autoDelete: false,
        durable: true,
        arguments: {
          'x-queue-type': 'quorum',
        },
      });
      channel?.sendToQueue(queueName, Buffer.from(JSON.stringify(message), 'utf8'), { persistent: true });
      await channel?.waitForConfirms();
      await channel?.close();
  
      return true;
    }
  
    public isReconnect(): boolean {
      return this.reconnect;
    }
  
    public setReconnect(reconnect: boolean): void {
      this.reconnect = reconnect;
    }
  
    public isConnecting(): boolean {
      return this.connecting;
    }
  
    public setConnecting(connecting: boolean): void {
      this.connecting = connecting;
    }
  
    public hasConnection(): boolean {
      return this.connection !== null;
    }
  
    public getConnection(): Connection | null {
      return this.connection;
    }
  

    protected async handleConnectionClose(): Promise<void> {
      this.connection = null;
  
      if (this.reconnect) {
        // We should reconnect
        await TimeoutUtil.wait(1000); // We should wait for a second
        await this.connect();
      }
    }
  
    protected handleConnectionError(error: Error): void {
      this.logger.error(`Connection error: ${error?.message}`);
      this.logger.error(JSON.stringify(error));
    }
  
    protected getConnectParameters(): Options.Connect {
      return {
        hostname: process.env.RABBITMQ_HOST,
        port: parseInt(process.env.RABBITMQ_PORT || '5672', 10),
        username: process.env.RABBITMQ_USER,
        password: process.env.RABBITMQ_PASS,
        vhost: process.env.RABBITMQ_VHOST,
        heartbeat: 60,
      };
    }

    protected handleChannelError(consume: ChannelConsumeCallback, reconnectCallback: ChannelReconnectCallback | null = null): ChannelHandleError {
      // eslint-disable-next-line @typescript-eslint/require-await
      return async (error: any): Promise<void> => {
        this.logger.debug(`Subscribe channel error: ${error.message} (${JSON.stringify(error)})`);
  
        const timeoutCallback = async (): Promise<void> => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            clearTimeout(timeout);
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            timeout.unref();
  
            const c = await consume();
            if (reconnectCallback && c) {
              reconnectCallback(c);
            }
          },
          timeout = setTimeout(
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            timeoutCallback,
            this.subscriptionReconnectTimeout,
          ); // we should wait for a second
      };
    }
  }
  