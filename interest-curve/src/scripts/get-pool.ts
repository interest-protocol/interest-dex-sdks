import { Network } from 'src/dex';

import { bardockSDK, log, STRICT_POOLS } from './utils';

const pools = STRICT_POOLS[Network.Bardock];

(async () => {
  const data = await bardockSDK.getPool(pools[0].address.toString());

  log(data);
})();
