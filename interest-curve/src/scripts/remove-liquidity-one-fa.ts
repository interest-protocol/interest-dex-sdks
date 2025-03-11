import { FA_ADDRESSES, Network } from 'src/dex';

import { account, bardockClient, bardockSDK, STRICT_POOLS } from './utils';

(async () => {
  const data = bardockSDK.removeLiquidityOneFa({
    pool: STRICT_POOLS[Network.Bardock][0].address.toString(),
    faOut: FA_ADDRESSES[Network.Bardock].TEST.toString(),
    amount: 10_000n,
    recipient: account.accountAddress.toString(),
    minAmountOut: 0n,
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
