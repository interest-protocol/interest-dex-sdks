import { FARMS, Network } from 'src/dex';

import {
  account,
  FA_ADDRESSES,
  movementMainnetClient,
  movementMainnetSDK,
} from '../utils';

const POW_8 = 100000000n;

(async () => {
  const data = movementMainnetSDK.addRewardFa({
    farm: FARMS[4].address.toString(),
    rewardFa: FA_ADDRESSES[Network.MovementMainnet].MOVE.toString(),
    amount: 30780n * POW_8,
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
