import { WHITELISTED_FAS } from 'src/dex';

import { movementMainnetSDK } from './utils';

(async () => {
  const data = await movementMainnetSDK.getFaPrimaryStore({
    owner: '0x878d2e00feee41f65a239a7811d5326c5a1c210758dccfa23bf121c8a28719b0',
    fa: WHITELISTED_FAS.MOVE.toString(),
  });

  console.log(data);
})();
