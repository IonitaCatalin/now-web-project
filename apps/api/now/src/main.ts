import { join } from 'path';

import * as dotenv from 'dotenv';
dotenv.config({ path: join(__dirname, '../../../../.env') });

import * as express from 'express';

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { json, urlencoded } from 'body-parser';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { ApiNowModule } from './app/api-now.module';

import { GlobalExceptionFilter } from '@now/common';


async function init(): Promise<void> {
    const server = express(),
    logger = new Logger('api-now'),
    app = await NestFactory.create<NestExpressApplication>(ApiNowModule, new ExpressAdapter(server), {
        cors: true,
    })

    app.useGlobalFilters(new GlobalExceptionFilter());

    app.use(json({ limit: '250mb' }));
    app.use(
      urlencoded({
          limit: '250mb',
          extended: true,
      }),
    );

    const port = process.env.ENV_API_NOW_PORT|| 9000;

    await app.listen(port, () => {
        logger.log(`Listening at http://localhost:${port}`);
    });

    process.on('unhandledRejection', (err: any): void => {
        logger.error(err.message);
        logger.error(JSON.stringify(err) || err);
    });

}

void init();


