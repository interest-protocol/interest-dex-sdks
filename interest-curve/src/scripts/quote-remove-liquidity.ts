import { WHITELISTED_CURVE_LP_COINS } from '../dex/constants';
import { log, movementMainnetSDK } from './utils';

const POW_9 = 1000000000n;

(async () => {
  const data = await movementMainnetSDK.quoteRemoveLiquidity({
    pool: WHITELISTED_CURVE_LP_COINS.USDCe_MOVE_VOLATILE.toString(),
    amountIn: POW_9,
  });

  log(data);
})();
