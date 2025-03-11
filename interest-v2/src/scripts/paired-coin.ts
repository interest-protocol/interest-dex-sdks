import { movementMainnetSDK, log } from './utils';

(async () => {
  const coin = await movementMainnetSDK.pairedCoin('0xa');

  log(coin);
})();
