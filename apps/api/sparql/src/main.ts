import { join } from 'path';
import { init } from '@now/tools';

import * as dotenv from 'dotenv';
dotenv.config({ path: join(__dirname, '../../../../.env') });

import { ApiSparQLModule } from './api-sparql.module';

(async () => {
  await init('API SparQL', ApiSparQLModule, parseInt(process.env.ENV_DAEMON_SYNC_PORT) || 9109);
})();
