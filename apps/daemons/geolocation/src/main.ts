import { join } from 'path';
import { init } from '@now/tools';

import * as dotenv from 'dotenv';
dotenv.config({ path: join(__dirname, '../../../../.env') });

import { DaemonGeolocationModule } from './geolocation.module';

(async () => {
  await init('Geolocation Daemon', parseInt(process.env.ENV_DAEMON_GEOLOCATION_PORT) || DaemonGeolocationModule, 9107);
})();
