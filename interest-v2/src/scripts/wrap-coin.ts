import { bardockSDK, processTx, COINS, log, account } from './utils';

const bardockCoins = COINS.bardock;

(async () => {
  const data = bardockSDK.wrapCoin({
    coin: bardockCoins.MOVE.toString(),
    amount: 1_000_000_00n,
    recipient: account.accountAddress.toString(),
  });

  const transactionResponse = await processTx(data);

  log(transactionResponse);
})();
