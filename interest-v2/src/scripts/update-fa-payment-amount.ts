import {
  movementMainnetClient,
  movementMainnetSDK,
  log,
  account,
} from './utils';

(async () => {
  const data = movementMainnetSDK.updateFaPaymentAmount(100_000_000n);

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

  log(transactionResponse);
})();
