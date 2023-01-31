import { Logger } from '@nestjs/common';
import { CustomTransportStrategy, Server, Transport } from '@nestjs/microservices';
import { RabbitMQUtil, PlatformUtil } from '@now/common';
import { ConfirmChannel, Message, Options } from 'amqplib';

export class RabbitMQTransportStrategy extends Server implements CustomTransportStrategy {

    protected readonly rabbitMq = RabbitMQUtil.getInstance();
    protected channel: ConfirmChannel | null = null;

    protected isProcessing = false;
    protected isExiting = false;

    public logger: Logger = new Logger(RabbitMQTransportStrategy.name);

    constructor(
        protected readonly queue: string,
        protected readonly consumerTag: string,
        protected readonly queueOptions: Options.AssertQueue | null = null,
        protected readonly consumeOptions: Options.Consume | null = null,
      ) {
        super();
      }
    
    public async listen(callback: () => void): Promise<void> {
        await this.init();
    
        this.channel = await this.rabbitMq.subscribe(
          this.queue,
          this.handleMessage.bind(this),
          this.queueOptions,
          {
            ...(this.consumeOptions || {}),
            consumerTag: this.consumerTag,
          },
          this.handleReconnect.bind(this),
        );
    
        if (this.channel === null) {
          // Connection do not exists
          this.shutdown(false);
    
          return;
        }
    
        this.logger.debug('Daemon successfully started!');
    
        if (callback) {
          callback();
        }
    }

    protected async handleMessage(message: Message): Promise<void> {
        if (this.isExiting) {
          this.logger.debug('Daemon need to die now, reject the message');
    
          // The daemon should die, so we are not working anymore
          await this.rejectMessage(message, true);
    
          return;
        }
        if (message === null) {
          this.logger.debug('The received message is null, we should exit');
    
          this.shutdown(false);
    
          return;
        }
    
        this.isProcessing = true;
    
        try {
          const { content } = message,
            messageObj = JSON.parse(content.toString()),
            pattern = JSON.stringify(messageObj.pattern),
            handler = this.getHandlerByPattern(pattern);
    
          this.logger.debug(`Processing pattern "${pattern}" (${content})`);
    
          if (!handler) {
            this.isProcessing = false;
    
            this.logger.error(`Cannot handle message with pattern: "${pattern}"`);
    
            // We don't have a handler for this message, so we throw it away
            await this.rejectMessage(message, false);
    
            return;
          }
    
          // Handle the message
          const response = await handler(messageObj.data);
    
          // Clean up after the run
          await PlatformUtil.runGarbageCollection();
    
          if (response) {
            // The response was successfully
            await this.resolveMessage(message);
          } else {
            this.logger.error('Response was not successful: ' + JSON.stringify(messageObj));
            // The response was not successfully, so we try again later
            await this.rejectMessage(message, true);
          }
        } catch (err) {
          this.logger.error(err.message);
    
          try {
            // The response was a fail so we don't try again later and throw the message
            await this.rejectMessage(message, false);
          } catch (error) {
            this.logger.error(error.message);
          }
        }
    
        // Finish processing
        this.isProcessing = false;
        if (this.isExiting) {
          this.shutdown();
        }
    }

    protected handleReconnect(channel: ConfirmChannel): void {
        this.channel = channel;
    }

    protected async rejectMessage(message: Message, requeue: boolean): Promise<void> {
        if (this.channel) {
          this.channel.reject(message, requeue);
          await this.channel.waitForConfirms();
        }
    }

    protected async resolveMessage(message: Message): Promise<void> {
        if (this.channel) {
          this.channel.ack(message);
          await this.channel.waitForConfirms();
        }
    }

    protected async init(): Promise<void> {
        this.isExiting = false;
    
        const connection = await this.rabbitMq.connect();
    
        connection?.on('close', this.handleConnectionClose.bind(this));
        connection?.on('error', RabbitMQUtil.unhandledRejection.bind(this));
    
        process.on('SIGINT', this.handleSigInt.bind(this));
    }

    protected async cancelQueue(): Promise<void> {
        try {
          if (this.channel) {
            await this.channel.cancel(this.consumerTag);
          }
        } catch (error) {
          this.logger.error(error);
        }
    }

    protected async handleConnectionClose(reason: JSON): Promise<void> {
        this.logger.debug(`RabbitMQ connection close: ${reason} (${JSON.stringify(reason)})`);
    
        this.isExiting = true;
    
        await this.cancelQueue();
    
        this.shutdown(false);
    }

    protected async handleSigInt(): Promise<void> {
        this.logger.debug('Received shutdown signal');
    
        this.isExiting = true;
    
        await this.cancelQueue();
    
        if (!this.isProcessing) {
          this.shutdown(false);
        }
    }

    protected shutdown(delay = true): void {
        this.logger.debug('Shuting down');
    
        if (delay) {
          const timeout = setTimeout(() => {
            clearTimeout(timeout);
            timeout.unref();
    
            process.exit(1);
          }, 1000);
        } else {
          process.exit(1);
        }
      }

    public async close(): Promise<void> {
        await this.rabbitMq.close();
    }
};