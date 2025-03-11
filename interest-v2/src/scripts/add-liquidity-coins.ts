import { bardockSDK, processTx, COINS, log, account } from './utils';

const bardockCoins = COINS.bardock;
(async () => {
  const data = bardockSDK.addLiquidityCoins({
    coinA: bardockCoins.MOVE.toString(),
    coinB: bardockCoins.MOVE.toString(),
    amountA: 400_000_000n,
    amountB: 220_000_000_0n,
    recipient: account.accountAddress.toString(),
  });
  const transactionResponse = await processTx(data);
  log(transactionResponse);
})();
