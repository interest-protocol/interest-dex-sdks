import { FA_ADDRESSES, Network } from 'src/dex';

import {
  account,
  movementMainnetClient,
  movementMainnetSDK,
  STRICT_POOLS,
} from './utils';

(async () => {
  const data = movementMainnetSDK.swap({
    pool: STRICT_POOLS[Network.MovementMainnet][0].address.toString(),
    faIn: FA_ADDRESSES[Network.MovementMainnet].MOVE.toString(),
    faOut: FA_ADDRESSES[Network.MovementMainnet].MOVE.toString(),
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
