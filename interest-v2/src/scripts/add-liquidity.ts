import { movementMainnetSDK, processTx, log, account, POW_8 } from './utils';
import { FA_ADDRESSES } from '../dex';

const fas = FA_ADDRESSES.movementMainnet;

(async () => {
  const data = movementMainnetSDK.addLiquidity({
    faA: fas.MOVE.toString(),
    faB: fas.FIRE_EMOJI.toString(),
    amountA: 4n * POW_8,
    amountB: 950_000_000n * POW_8,
    recipient: account.accountAddress.toString(),
  });

  const transactionResponse = await processTx(data);

  log(transactionResponse);
})();
