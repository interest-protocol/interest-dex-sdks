import { log, movementMainnetSDK } from './utils';

const POOL_ID =
  '0x691877d4f5d4c1177d02f6ca3d399df4624af265533d305c008f6cb15d1567bc';

(async () => {
  const data = await movementMainnetSDK.quoteRemoveLiquidityOneFa({
    pool: POOL_ID,
    faOut: '0x83121c9f9b0527d1f056e21a950d6bf3b9e9e2e8353d0e95ccea726713cbea39',
    amountIn: 2_000n,
  });

  log(data);
})();
