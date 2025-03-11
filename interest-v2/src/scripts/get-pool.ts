import { bardockSDK, log } from './utils';
import { FA_ADDRESSES } from 'src/dex';

const bardockFAs = FA_ADDRESSES.bardock;

(async () => {
  const data = await bardockSDK.getPool(
    '0x6789e2c767ff241bdf9dd84c4ebfd1322445b7f5ab298f066161d014a6ec3c20'
  );

  log(data);

  const data2 = await bardockSDK.getPoolFromFas({
    faA: bardockFAs.MOVE.toString(),
    faB: bardockFAs.MEME.toString(),
  });

  log(data2);
})();
