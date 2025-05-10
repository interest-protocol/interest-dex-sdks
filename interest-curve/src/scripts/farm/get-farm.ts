import { FARMS } from 'src/dex';

import { log, movementMainnetSDK } from '../utils';

(async () => {
  const data = await movementMainnetSDK.getFarms([FARMS[4].address.toString()]);

  log(data);
})();
