import { FARMS, WHITELISTED_FAS } from 'src/dex';

import { account, log, movementMainnetSDK } from '../utils';

(async () => {
  const data = await movementMainnetSDK.getFarmAccount({
    user: account.accountAddress.toString(),
    farm: FARMS[0].address.toString(),
    rewardFas: [WHITELISTED_FAS.FIRE.toString()],
  });

  log(data);
})();
