import { log, movementMainnetSDK } from './utils';

const POOL_ID =
  '0x486cc5aacea27797e8f47971ac5b0bc301d1aafd9b5510811360a7d28768ad39';

const POW_8 = BigInt(10 ** 8);
(async () => {
  const data = await movementMainnetSDK.quoteAddLiquidity({
    pool: POOL_ID,
    amountsIn: [POW_8, 0n],
  });

  log(data);
})();
