import { movementMainnetClient, log } from './utils';
import { AccountAddress } from '@aptos-labs/ts-sdk';

(async () => {
  const data = await movementMainnetClient.getAccountCoinAmount({
    accountAddress: AccountAddress.from(
      '0x878d2e00feee41f65a239a7811d5326c5a1c210758dccfa23bf121c8a28719b0'
    ),
    coinType: '0x1::aptos_coin::AptosCoin',
  });

  log(data);
})();
