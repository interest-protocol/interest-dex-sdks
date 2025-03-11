import { bardockSDK, bardockClient, log, account } from './utils';

const POW_8 = 10n ** 8n;

(async () => {
  const data = bardockSDK.deployMemeWithCoin({
    name: 'Thurdddmp',
    symbol: 'THRddddUMP',
    totalSupply: 1_000_000_000n * POW_8,
    recipient: account.accountAddress.toString(),
    decimals: 8,
    iconURI: '',
    projectURI: '',
    liquidityMemeAmount: 700_000_000n * POW_8,
    liquidityAptosAmount: (1n * POW_8) / 10n,
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

  log(transactionResponse);
})();
