import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { CustomTransportStrategy } from '@nestjs/microservices';

export async function init(name: string, moduleClass: any, strategy: CustomTransportStrategy, port: number): Promise<void> {
  const logger = new Logger(name),

  server = express(),
  application = await NestFactory.create<NestExpressApplication>(moduleClass, new ExpressAdapter(server), {
    cors: true,
    logger
  });

  application.connectMicroservice({
      strategy,
  });

  await application.startAllMicroservices();

  application.useLogger(Logger);

  await application.listen(port, () => {
    logger.log(`Listening at http://localhost:${port}`);
  });
}
