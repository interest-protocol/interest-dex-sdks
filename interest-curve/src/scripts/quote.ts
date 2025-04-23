import { log, movementMainnetSDK } from './utils';

const POOL_ID =
  '0x89d75aae2a4cc65660bd28d989582a69a3c1579ed32d965d346f21e5bf191330';

const POW_8 = 100000000n;

(async () => {
  console.log(BigInt(Math.floor(0.6 * 100000000)));
  const data = await movementMainnetSDK.quoteAddLiquidity({
    pool: POOL_ID,
    amountsIn: [BigInt(Math.floor(0.6 * 100000000)), 3500n * POW_8],
  });

  log(data);
})();
