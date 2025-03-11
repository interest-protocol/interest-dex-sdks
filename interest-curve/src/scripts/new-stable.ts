import { account, bardockClient, bardockSDK, COINS } from './utils';

(async () => {
  const data = bardockSDK.newStablePoolWithCoins({
    coinTypes: [COINS.bardock.MOVE, COINS.bardock.MOVE],
  });

  const transaction = await bardockClient.transaction.build.simple({
    sender: account.accountAddress,
    data,
  });

  const senderAuthenticator = await bardockClient.sign({
    signer: account,
    transaction,
  });

  const submittedTx = await bardockClient.transaction.submit.simple({
    transaction,
    senderAuthenticator,
  });

  const transactionResponse = await bardockClient.waitForTransaction({
    transactionHash: submittedTx.hash,
  });

  console.log(transactionResponse);
})();
