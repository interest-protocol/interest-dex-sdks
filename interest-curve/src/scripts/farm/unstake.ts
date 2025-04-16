import { FARMS } from 'src/dex';

import { account, movementMainnetClient, movementMainnetSDK } from '../utils';

(async () => {
  const data = movementMainnetSDK.unstake({
    farm: FARMS[0].address.toString(),
    amount: 1196738n,
    recipient: account.accountAddress.toString(),
  });

  const transaction = await movementMainnetClient.transaction.build.simple({
    sender: account.accountAddress,
    data,
  });

  const senderAuthenticator = await movementMainnetClient.sign({
    signer: account,
    transaction,
  });

  const submittedTx = await movementMainnetClient.transaction.submit.simple({
    transaction,
    senderAuthenticator,
  });

  const transactionResponse = await movementMainnetClient.waitForTransaction({
    transactionHash: submittedTx.hash,
  });

  console.log(transactionResponse);
})();
