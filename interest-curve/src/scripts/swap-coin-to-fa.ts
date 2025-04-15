import { COINS, FA_ADDRESSES, Network } from 'src/dex';

import { account, bardockClient, bardockSDK, STRICT_POOLS } from './utils';

const coinTypes = COINS[Network.Bardock];

(async () => {
  const data = bardockSDK.swapCoinToFa({
    pool: STRICT_POOLS[Network.Bardock][0].address.toString(),
    coinIn: coinTypes['0x1::aptos_coin::AptosCoin'].type,
    faOut: FA_ADDRESSES[Network.Bardock].MOVE.toString(),
    amountIn: 100n,
    recipient: account.accountAddress.toString(),
    minAmountOut: 0n,
  });

  const transaction = await bardockClient.transaction.build.simple({
    sender: account.accountAddress,
    data,
  });

  const senderAuthenticator = await bardockClient.sign({
    signer: account,
    transaction,
  });

  const submittedTx = await bardockClient.transaction.submit.simple({
    transaction,
    senderAuthenticator,
  });

  const transactionResponse = await bardockClient.waitForTransaction({
    transactionHash: submittedTx.hash,
  });

  console.log(transactionResponse);
})();
