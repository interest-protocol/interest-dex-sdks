import { bardockSDK, log } from './utils';
import { FA_ADDRESSES } from '../dex';

const bardockFAs = FA_ADDRESSES.bardock;

(async () => {
  const data = await bardockSDK.getPoolAddress({
    faA: bardockFAs.MOVE.toString(),
    faB: bardockFAs.MEME.toString(),
  });

  log({ ...data, stringAddress: data.poolAddress.toString() });
})();
