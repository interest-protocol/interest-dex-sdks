import {
  movementMainnetSDK,
  log,
  account,
  movementMainnetClient,
  processTx,
} from './utils';

const POW_8 = 10n ** 8n;

(async () => {
  const data = movementMainnetSDK.createFa({
    name: 'Test123',
    symbol: 'TEST123',
    totalSupply: 1_000_000_000n * POW_8,
    recipient: account.accountAddress.toString(),
    decimals: 8,
    iconURI: '',
    projectURI: 'https://www.interest.xyz/',
  });

  const transactionResponse = await processTx(data, movementMainnetClient);

  log(transactionResponse);
})();
