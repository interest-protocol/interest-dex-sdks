import {
  movementMainnetSDK,
  processTx,
  COINS,
  log,
  account,
  POW_8,
} from './utils';
import { FA_ADDRESSES } from '../dex';

const movementMainnetCoins = COINS.movementMainnet;
const movementMainnetFAs = FA_ADDRESSES.movementMainnet;

(async () => {
  const data = movementMainnetSDK.addLiquidityOneCoin({
    coinA: movementMainnetCoins.MOVE.toString(),
    faB: movementMainnetFAs.FIRE_EMOJI.toString(),
    amountA: POW_8 / 100n,
    amountB: 950_000_000n * POW_8,
    recipient: account.accountAddress.toString(),
  });

  const transactionResponse = await processTx(data);

  log(transactionResponse);
})();
