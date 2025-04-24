import { PACKAGES } from 'src/dex';

import { account, movementMainnetClient } from './utils';

(async () => {
  const transaction = await movementMainnetClient.transaction.build.simple({
    sender: account.accountAddress,
    data: {
      function: `${PACKAGES.movementMainnet.address.toString()}::stable_pool::apply_fee`,
      functionArguments: [
        '0x54c89a961dd60e30f1c03ba2c6f5a052e7ed0ba36fcca3c1153f06449199b285',
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
