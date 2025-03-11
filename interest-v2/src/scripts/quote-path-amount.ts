import { bardockSDK, log } from './utils';
import { FA_ADDRESSES } from '../dex';

const bardockFAs = FA_ADDRESSES.bardock;

(async () => {
  const data = await bardockSDK.quotePathAmountOut({
    path: [bardockFAs.MOVE.toString(), bardockFAs.MEME.toString()],
    amount: 1_000_000n,
  });

  log(data);

  const aptWethPool = await bardockSDK.getPoolFromFas({
    faA: bardockFAs.MOVE.toString(),
    faB: bardockFAs.MEME.toString(),
  });

  const aptUsdtPool = await bardockSDK.getPoolFromFas({
    faA: bardockFAs.MOVE.toString(),
    faB: bardockFAs.MEME.toString(),
  });

  const amount0 = bardockSDK.getAmountOut({
    pool: aptWethPool,
    amountIn: 1_000_000n,
    fee: 3_000_000n,
    metadataOut: bardockFAs.MOVE.toString(),
  });

  const amount1 = bardockSDK.getAmountOut({
    pool: aptUsdtPool,
    amountIn: amount0,
    fee: 3_000_000n,
    metadataOut: bardockFAs.MOVE.toString(),
  });

  log(amount1);

  const dataIn = await bardockSDK.quotePathAmountIn({
    path: [bardockFAs.MOVE.toString(), bardockFAs.MEME.toString()],
    amount: data.amountOut,
  });

  log(dataIn);
})();
