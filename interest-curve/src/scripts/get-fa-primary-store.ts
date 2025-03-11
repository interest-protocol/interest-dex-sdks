import { FA_ADDRESSES, Network } from 'src/dex';

import { portoSDK } from './utils';

(async () => {
  const data = await portoSDK.getFaPrimaryStore({
    owner: '0x878d2e00feee41f65a239a7811d5326c5a1c210758dccfa23bf121c8a28719b0',
    fa: FA_ADDRESSES[Network.Porto].NETH.toString(),
  });

  console.log(data);
})();
