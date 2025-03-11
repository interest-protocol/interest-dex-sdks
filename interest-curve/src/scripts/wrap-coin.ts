import { Network } from '../dex';
import {
  account,
  COINS,
  movementMainnetClient,
  movementMainnetSDK,
} from './utils';

const POW_8 = 100000000n;

(async () => {
  const data = movementMainnetSDK.wrapCoin({
    coinType: COINS[Network.MovementMainnet].MOVE,
    amount: POW_8 / 2n,
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
