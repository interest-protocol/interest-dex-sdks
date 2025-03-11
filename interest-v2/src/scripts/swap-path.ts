import {
  movementMainnetSDK,
  processTx,
  POW_8,
  log,
  account,
  bardockClient,
} from './utils';
import { FA_ADDRESSES } from '../dex';

const movementMainnetFAs = FA_ADDRESSES.movementMainnet;

(async () => {
  const data = movementMainnetSDK.swapPath({
    path: [
      movementMainnetFAs.MOVE.toString(),
      movementMainnetFAs.FIRE_EMOJI.toString(),
    ],
    amountIn: (1n * POW_8) / 5n,
    recipient: account.accountAddress.toString(),
    minAmountOut: 0n,
  });

  const transactionResponse = await processTx(data, bardockClient);

  log(transactionResponse);
})();
