import { join } from 'path';
import { init } from '@now/tools';

import * as dotenv from 'dotenv';
dotenv.config({ path: join(__dirname, '../../../../.env') });

import { DaemonSyncModule } from './sync.module';

(async () => {
  await init('Sync Daemon', DaemonSyncModule, parseInt(process.env.ENV_DAEMON_SYNC_PORT) || 9106);
})();
