import {
  MAINNET_POOLS,
  WHITELISTED_CURVE_LP_COINS,
  WHITELISTED_FAS,
} from '../dex/constants';
import { account, movementMainnetClient, movementMainnetSDK } from './utils';

const POW_8 = 100000000n;

(async () => {
  const data = movementMainnetSDK.addLiquidity({
    pool: MAINNET_POOLS[
      WHITELISTED_CURVE_LP_COINS.WETHe_MOVE_VOLATILE.toString()
    ].address.toString(),
    fasIn: [WHITELISTED_FAS.WETHe.toString(), WHITELISTED_FAS.MOVE.toString()],
    amounts: [BigInt(Math.floor(0.6 * 100000000)), 3467n * POW_8],
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
