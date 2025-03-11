import { FA_ADDRESSES, Network } from 'src/dex';

import { bardockSDK, log, STRICT_POOLS } from './utils';

const bardockPools = STRICT_POOLS[Network.Bardock];
const bardockFungibleAssets = FA_ADDRESSES[Network.Bardock];

(async () => {
  const data = await bardockSDK.quoteSwap({
    pool: bardockPools[0].address.toString(),
    faIn: bardockFungibleAssets.MOVE.toString(),
    faOut: bardockFungibleAssets.TEST.toString(),
    amountIn: BigInt(10000),
  });

  log(data);
})();
