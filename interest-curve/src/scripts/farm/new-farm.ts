import { Network, WHITELISTED_CURVE_LP_COINS } from 'src/dex';

import {
  account,
  FA_ADDRESSES,
  movementMainnetClient,
  movementMainnetSDK,
} from '../utils';

(async () => {
  const now = Date.now() / 1000;

  const data = movementMainnetSDK.newFarm({
    startTimestamp: now + 60 * 2,
    rewardFas: [FA_ADDRESSES[Network.MovementMainnet].FIRE.toString()],
    stakedFa: WHITELISTED_CURVE_LP_COINS.USDTe_MOVE_VOLATILE.toString(),
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
