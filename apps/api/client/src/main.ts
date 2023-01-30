import { join } from 'path';

import * as dotenv from 'dotenv';
dotenv.config({ path: join(__dirname, '../../../../.env') });

import * as express from 'express';

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { json, urlencoded } from 'body-parser';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { ApiClientModule } from './app/api-client.module';

import { GlobalExceptionFilter } from '@now/common';


async function init(): Promise<void> {
    const server = express(),
    logger = new Logger('api-client'),
    app = await NestFactory.create<NestExpressApplication>(ApiClientModule, new ExpressAdapter(server), {
        cors: true,
    })

    app.useGlobalFilters(new GlobalExceptionFilter());

    app.use(json({ limit: '50mb' }));
    app.use(
      urlencoded({
          limit: '50mb',
          extended: true,
      }),
    );

    const port = process.env.ENV_API_CLIENT_PORT|| 9108;

    await app.listen(port, () => {
        logger.log(`Listening at http://localhost:${port}`);
    });

    process.on('unhandledRejection', (err: any): void => {
        logger.error(err.message);
        logger.error(JSON.stringify(err) || err);
    });

}

void init();


