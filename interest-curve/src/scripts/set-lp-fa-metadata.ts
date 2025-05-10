import { WHITELISTED_CURVE_LP_COINS } from 'src/dex';

import { account, movementMainnetClient, movementMainnetSDK } from './utils';

(async () => {
  const transaction = await movementMainnetClient.transaction.build.simple({
    sender: account.accountAddress,
    data: movementMainnetSDK.setLpFaMetadata({
      pool: WHITELISTED_CURVE_LP_COINS.MOVE_WETHe_VOLATILE.toString(),
      name: 'IPX MOVE/WETHe Volatile',
      symbol: 'IPX v-MOVE/WETHe',
      iconUri:
        'https://interestprotocol.infura-ipfs.io/ipfs/QmezXPykL5y92t6tvsJrmyRr2GUZHwSqyAmVUM32zcKWz2',
      projectUri: 'https://www.interest.xyz/',
    }),
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
