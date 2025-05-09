import {
  MAINNET_POOLS,
  WHITELISTED_CURVE_LP_COINS,
  WHITELISTED_FAS,
} from 'src/dex';

import { account, movementMainnetClient, movementMainnetSDK } from './utils';

(async () => {
  const data = movementMainnetSDK.swap({
    pool: MAINNET_POOLS[
      WHITELISTED_CURVE_LP_COINS.USDCe_MOVE_VOLATILE.toString()
    ].address.toString(),
    faIn: WHITELISTED_FAS.MOVE.toString(),
    faOut: WHITELISTED_FAS.MOVE.toString(),
    amountIn: 1000n,
    recipient: account.accountAddress.toString(),
    minAmountOut: 0n,
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
