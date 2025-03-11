import { Network } from 'src/dex';

import { account, bardockClient, bardockSDK, STRICT_POOLS } from './utils';

(async () => {
  const data = bardockSDK.removeLiquidity({
    pool: STRICT_POOLS[Network.Bardock][0].address.toString(),
    amount: 1_147_177_934n,
    recipient: account.accountAddress.toString(),
    minAmountsOut: [0n, 0n, 0n, 0n, 0n, 0n, 0n],
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
