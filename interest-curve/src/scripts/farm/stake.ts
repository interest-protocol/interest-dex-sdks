import { FARMS, WHITELISTED_CURVE_LP_COINS } from 'src/dex';

import { account, movementMainnetClient, movementMainnetSDK } from '../utils';

(async () => {
  const data = movementMainnetSDK.stake({
    farm: FARMS[0].address.toString(),
    faIn: WHITELISTED_CURVE_LP_COINS.USDTe_MOVE_VOLATILE.toString(),
    amount: 1196738n,
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
