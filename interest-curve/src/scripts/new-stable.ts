import {
  account,
  FA_ADDRESSES,
  movementMainnetClient,
  movementMainnetSDK,
} from './utils';

const mainnetFAs = FA_ADDRESSES.movementMainnet;

(async () => {
  const data = movementMainnetSDK.newStablePoolWithFas({
    metadatas: [mainnetFAs.USDCe.toString(), mainnetFAs.MOVE.toString()],
  });
  console.log(data);
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
