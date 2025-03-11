import { FA_ADDRESSES, Network } from 'src/dex';

import {
  account,
  movementMainnetClient,
  movementMainnetSDK,
  STRICT_POOLS,
} from './utils';

const movementMainnetFAs = FA_ADDRESSES[Network.MovementMainnet];
const pools = STRICT_POOLS[Network.MovementMainnet];

const POW_8 = 100000000n;

(async () => {
  const data = movementMainnetSDK.addLiquidity({
    pool: pools[0].address.toString(),
    fasIn: [
      movementMainnetFAs.MOVE.toString(),
      movementMainnetFAs.TEST.toString(),
    ],
    amounts: [POW_8, POW_8 * 2n],
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
