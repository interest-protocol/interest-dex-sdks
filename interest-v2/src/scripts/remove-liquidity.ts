import { bardockSDK, processTx, log, account, POW_8 } from './utils';

(async () => {
  const data = bardockSDK.removeLiquidity({
    lpFa: '0x365438c1666d336d7899ab1bf9bfe52024c80a32eef5a32d1e14838efb20aee9',
    amount: 1n * POW_8,
    recipient: account.accountAddress.toString(),
  });

  const transactionResponse = await processTx(data);

  log(transactionResponse);
})();
