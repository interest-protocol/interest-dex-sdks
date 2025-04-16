import { FARMS, Network } from 'src/dex';

import {
  account,
  FA_ADDRESSES,
  movementMainnetClient,
  movementMainnetSDK,
} from '../utils';

const REWARDS_PER_SECOND = 0.0345519179894179;

(async () => {
  const data = movementMainnetSDK.setRewardsPerSecond({
    farm: FARMS[0].address.toString(),
    rewardFa: FA_ADDRESSES[Network.MovementMainnet].FIRE.toString(),
    rewardsPerSecond: BigInt(Math.floor(REWARDS_PER_SECOND * 1e8)),
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
