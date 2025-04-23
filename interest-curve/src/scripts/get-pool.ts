import { WHITELISTED_CURVE_LP_COINS } from '../dex/constants';
import { log, movementMainnetSDK } from './utils';
(async () => {
  const data = await movementMainnetSDK.getPool(
    WHITELISTED_CURVE_LP_COINS.WETHe_MOVE_VOLATILE.toString()
  );

  log(data);
})();
