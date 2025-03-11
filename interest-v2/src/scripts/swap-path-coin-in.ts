import { movementMainnetSDK, processTx, log, account, POW_8 } from './utils';
import { FA_ADDRESSES, COINS } from '../dex';

const movementMainnetFAs = FA_ADDRESSES.movementMainnet;
const movementMainnetCoins = COINS.movementMainnet;

(async () => {
  const data = movementMainnetSDK.swapPathCoinIn({
    coinIn: movementMainnetCoins.MOVE.type,
    path: [movementMainnetFAs.FIRE_EMOJI.toString()],
    amountIn: (1n * POW_8) / 2n,
    recipient: account.accountAddress.toString(),
    minAmountOut: 0n,
  });

  const transactionResponse = await processTx(data);

  log(transactionResponse);
})();
