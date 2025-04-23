import { Network } from '../dex';
import {
  account,
  FA_ADDRESSES,
  movementMainnetClient,
  movementMainnetSDK,
} from './utils';

const movementMainnetFAs = FA_ADDRESSES[Network.MovementMainnet];

(async () => {
  const data = movementMainnetSDK.newVolatilePoolWithFas({
    fas: [
      movementMainnetFAs.MOVE.toString(),
      movementMainnetFAs.WETHe.toString(),
    ],
    prices: [7_324n * movementMainnetSDK.PRECISION],
    a: 500000n,
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
