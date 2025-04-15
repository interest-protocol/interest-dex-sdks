import { WHITELISTED_FAS } from 'src/dex';

import { log, movementMainnetSDK } from './utils';

(async () => {
  const data = await movementMainnetSDK.getFAMetadata(
    WHITELISTED_FAS.MOVE.toString()
  );

  log(data);
})();
