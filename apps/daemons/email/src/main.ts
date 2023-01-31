import { join } from 'path';
import { init } from '@now/tools';

import * as dotenv from 'dotenv';
dotenv.config({ path: join(__dirname, '../../../../.env') });

import { DaemonEmailModule } from './email.module';
import { RabbitMQTransportStrategy } from '@now/tools';
import { QUEUE_SEND_MAIL } from '@now/common';

(async () => {
  await init('Email Daemon', DaemonEmailModule,new RabbitMQTransportStrategy(QUEUE_SEND_MAIL, 'daemon-email'), parseInt(process.env.ENV_DAEMON_EMAIL_PORT) || 9106);
})();
