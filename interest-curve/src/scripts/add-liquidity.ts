import {
  MAINNET_POOLS,
  WHITELISTED_CURVE_LP_COINS,
  WHITELISTED_FAS,
} from '../dex/constants';
import {
  account,
  movementMainnetClient,
  movementMainnetSDK,
  POW_8,
  POW_8BN,
} from './utils';

(async () => {
  const data = movementMainnetSDK.addLiquidity({
    pool: MAINNET_POOLS[
      WHITELISTED_CURVE_LP_COINS.MOVE_WETHe_VOLATILE.toString()
    ].address.toString(),
    fasIn: [WHITELISTED_FAS.WETHe.toString(), WHITELISTED_FAS.MOVE.toString()],
    amounts: [BigInt(Math.floor(0.5 * POW_8)), 3662n * POW_8BN],
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
