import { bardockSDK, log } from './utils';
import { FA_ADDRESSES } from '../dex';

const coinTypes = FA_ADDRESSES.bardock;

(async () => {
  const exists = await bardockSDK.pathExists([
    coinTypes.MOVE.toString(),
    coinTypes.MEME.toString(),
  ]);

  log(exists);
})();
