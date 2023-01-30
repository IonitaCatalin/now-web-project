import { join } from 'path';
import { init } from '@now/tools';

import * as dotenv from 'dotenv';
dotenv.config({ path: join(__dirname, '../../../../.env') });

import { DaemonEmailModule } from './email.module';

(async () => {
  await init('Sync Daemon', DaemonEmailModule, parseInt(process.env.ENV_DAEMON_EMAIL_PORT) || 9106);
})();
