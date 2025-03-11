import { movementMainnetSDK, log } from './utils';
import { COIN_TYPES } from '../dex';

const coinTypes = COIN_TYPES.movementMainnet;

(async () => {
  const metadata = await movementMainnetSDK.pairedMetadata(coinTypes.MOVE);

  log(metadata);
})();
