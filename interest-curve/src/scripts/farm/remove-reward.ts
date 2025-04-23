import { PACKAGES, WHITELISTED_FAS } from 'src/dex';

import { account, movementMainnetClient } from '../utils';

(async () => {
  const transaction = await movementMainnetClient.transaction.build.simple({
    sender: account.accountAddress,
    data: {
      function: `${PACKAGES.movementMainnet.address.toString()}::farm::remove_reward`,
      functionArguments: [
        '0xf54948ae917f101621ed02e813b0603f9c556f0041aa311d9e535c3b07a1ca6b',
        WHITELISTED_FAS.MOVE.toString(),
        1152200000000n,
      ],
    },
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
