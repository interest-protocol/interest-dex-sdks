import { PACKAGES } from 'src/dex';
import { WHITELISTED_CURVE_LP_COINS, WHITELISTED_FAS } from 'src/dex';

import { account, movementMainnetClient, TREASURY_ADDRESS } from './utils';

(async () => {
  const transaction = await movementMainnetClient.transaction.build.simple({
    sender: account.accountAddress,
    data: {
      function: `${PACKAGES.movementMainnet.address.toString()}::interest_curve_entry::claim_stable_admin`,
      functionArguments: [
        WHITELISTED_CURVE_LP_COINS.USDCe_USDTe_STABLE,
        WHITELISTED_FAS.USDCe.toString(),
        TREASURY_ADDRESS.toString(),
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
