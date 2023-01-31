import { join } from 'path';
import { init } from '@now/tools';

import * as dotenv from 'dotenv';
dotenv.config({ path: join(__dirname, '../../../../.env') });

import { ApiMgtModule } from './app/api-mgt.module';

(async () => {
  // await init('API MGT', ApiMgtModule, parseInt(process.env.ENV_API_MGT_PORT) || 9108);
})();
