import { FUNGIBLE_ASSETS, Network } from 'src/dex';

import { log, portoSDK } from './utils';

const fas = FUNGIBLE_ASSETS[Network.Porto];

(async () => {
  const data = await portoSDK.getFAMetadata(fas.USDC.address.toString());

  log(data);
})();
