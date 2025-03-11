import {
  AccountAddress,
  Aptos,
  InputGenerateTransactionPayloadData,
  InputViewFunctionData,
} from '@aptos-labs/ts-sdk';
import { all, pathOr, propOr } from 'ramda';
import invariant from 'tiny-invariant';

import { FUNGIBLE_ASSETS, Network, PACKAGES, TYPES } from './constants';
import {
  AddLiquidityArgs,
  AssertNewVolatilePoolArgs,
  ConstructorArgs,
  FaPayload,
  GetFaPrimaryStoreArgs,
  GetPoolAddressArgs,
  GetPoolPageArgs,
  HarvestArgs,
  NewStablePoolWithCoinsArgs,
  NewStablePoolWithFasArgs,
  NewVolatilePoolWithCoinsArgs,
  NewVolatilePoolWithFasArgs,
  Package,
  QuoteAddLiquidityArgs,
  QuoteRemoveLiquidityArgs,
  QuoteRemoveLiquidityOneCoinArgs,
  QuoteRemoveLiquidityOneFaArgs,
  QuoteSwapArgs,
  QuoteSwapCoinToCoinArgs,
  QuoteSwapCoinToFaArgs,
  QuoteSwapFaToCoinArgs,
  RemoveLiquidityArgs,
  RemoveLiquidityOneFaArgs,
  StakeArgs,
  StakeCoinArgs,
  SwapArgs,
  SwapCoinToFaArgs,
  UnstakeArgs,
  WrapCoinArgs,
} from './dex.types';
import {
  getDefaultConstructorArgs,
  NEW_STABLE_POOL_COIN_FUNCTION_NAME,
  NEW_VOLATILE_POOL_COIN_FUNCTION_NAME,
  toFaPayload,
  toInterestPool,
} from './utils';

export class InterestCurve {
  #client: Aptos;
  #package: Package;
  #interfaceModule = 'interest_curve_entry';
  #routerModule = 'interest_curve_router';
  #queryModule = 'interest_curve_query';

  // Default values for stable pools
  #stableA = 1500n;

  // Default values for volatile pools
  #volatileA = 400000n;
  #gamma = 145000000000000n;
  #extraProfit = 2000000000000n;
  #adjustmentStep = 146000000000000n;
  #maHalfTime = 600_000n; // 10 minutes
  #midFee = 26000000n;
  #outFee = 45000000n;
  #gammaFee = 230000000000000n;

  // Public Variables
  network: Network;
  // 1e18
  PRECISION = 1000000000000000000n;
  LP_COIN_DECIMALS = 9;
  LP_COIN_DECIMALS_SCALAR = 1_000_000_000n;
  // Max Stable Pool Values
  STABLE_MAX_A_VALUE = 1_000_000n;
  STABLE_MAX_A_CHANGE = 10n;
  STABLE_MIN_RAMP_TIME = 86_400_000n;
  // Max Volatile Pool Values
  MIN_FEE = 5n * 100_000n;
  MAX_FEE = 10n * 1_000_000_000n;
  MAX_MA_HALF_TIME = 7n * 86400000n;
  MAX_ADMIN_FEE = 10000000000n;
  MIN_GAMMA = 10_000_000_000n;
  MAX_GAMMA = 10_000_000_000_000_000n;

  constructor(args: ConstructorArgs | undefined | null = null) {
    const data = {
      ...getDefaultConstructorArgs(),
      ...args,
    };

    invariant(data.client, 'Client is required');
    invariant(data.network, 'Network is required');
    invariant(PACKAGES[data.network], 'Invalid network');

    this.#client = data.client;
    this.#package = PACKAGES[data.network];
    this.network = data.network;
  }

  public newStablePoolWithFas(
    args: NewStablePoolWithFasArgs
  ): InputGenerateTransactionPayloadData {
    invariant(args.metadatas.length >= 2, 'A pool must have at least 2 assets');

    return {
      function: `${this.#package}::${this.#interfaceModule}::new`,
      functionArguments: [args.metadatas, args.initialA ?? this.#stableA],
    };
  }

  public newVolatilePoolWithCoins({
    a = this.#volatileA,
    gamma = this.#gamma,
    extraProfit = this.#extraProfit,
    adjustmentStep = this.#adjustmentStep,
    maHalfTime = this.#maHalfTime,
    midFee = this.#midFee,
    outFee = this.#outFee,
    gammaFee = this.#gammaFee,
    prices,
    coinTypes,
  }: NewVolatilePoolWithCoinsArgs): InputGenerateTransactionPayloadData {
    invariant(
      6 >= coinTypes.length && coinTypes.length >= 2,
      'Coin types must be between 2 and 6. Use newVolatilePoolWithFas for more than 6 assets.'
    );
    this.#assertNewVolatilePoolArgs({
      prices,
      midFee,
      outFee,
      gammaFee,
      a,
      gamma,
      extraProfit,
      adjustmentStep,
      maHalfTime,
      assets: coinTypes,
    });

    return {
      function: `${this.#package.address.toString()}::${this.#interfaceModule}::${NEW_VOLATILE_POOL_COIN_FUNCTION_NAME[coinTypes.length]}`,
      typeArguments: coinTypes,
      functionArguments: [
        [a, gamma],
        [extraProfit, adjustmentStep, maHalfTime],
        prices,
        [midFee, outFee, gammaFee],
      ],
    };
  }

  public newVolatilePoolWithFas({
    a = this.#volatileA,
    gamma = this.#gamma,
    extraProfit = this.#extraProfit,
    adjustmentStep = this.#adjustmentStep,
    maHalfTime = this.#maHalfTime,
    midFee = this.#midFee,
    outFee = this.#outFee,
    gammaFee = this.#gammaFee,
    prices,
    fas,
  }: NewVolatilePoolWithFasArgs): InputGenerateTransactionPayloadData {
    this.#assertNewVolatilePoolArgs({
      prices,
      midFee,
      outFee,
      gammaFee,
      a,
      gamma,
      extraProfit,
      adjustmentStep,
      maHalfTime,
      assets: fas,
    });

    return {
      function: `${this.#package.address.toString()}::${this.#interfaceModule}::new_volatile_pool`,
      functionArguments: [
        fas,
        [a, gamma],
        [extraProfit, adjustmentStep, maHalfTime],
        prices,
        [midFee, outFee, gammaFee],
      ],
    };
  }

  public newStablePoolWithCoins(
    args: NewStablePoolWithCoinsArgs
  ): InputGenerateTransactionPayloadData {
    invariant(
      6 >= args.coinTypes.length && args.coinTypes.length >= 2,
      'Coin types must be between 2 and 6. Use newStablePoolWithFas for more than 6 assets.'
    );

    return {
      function: `${this.#package.address.toString()}::${this.#interfaceModule}::${NEW_STABLE_POOL_COIN_FUNCTION_NAME[args.coinTypes.length]}`,
      typeArguments: args.coinTypes,
      functionArguments: [args.initialA ?? this.#stableA],
    };
  }

  public swap({
    pool,
    faIn,
    faOut,
    amountIn,
    minAmountOut,
    recipient,
  }: SwapArgs): InputGenerateTransactionPayloadData {
    invariant(
      AccountAddress.isValid({ input: recipient }).valid,
      'Recipient is invalid'
    );
    invariant(AccountAddress.isValid({ input: pool }).valid, 'Pool is invalid');
    invariant(
      AccountAddress.isValid({ input: faIn }).valid,
      'Fa in is invalid'
    );
    invariant(
      AccountAddress.isValid({ input: faOut }).valid,
      'Fa out is invalid'
    );
    invariant(amountIn > 0n, 'Amount in must be greater than 0');
    invariant(faIn !== faOut, 'Fa in and fa out must be different');

    return {
      function: `${this.#package.address.toString()}::${this.#interfaceModule}::swap`,
      functionArguments: [pool, faIn, faOut, amountIn, minAmountOut, recipient],
    };
  }

  public swapCoinToFa({
    pool,
    coinIn,
    faOut,
    amountIn,
    minAmountOut,
    recipient,
  }: SwapCoinToFaArgs): InputGenerateTransactionPayloadData {
    invariant(
      AccountAddress.isValid({ input: recipient }).valid,
      'Recipient is invalid'
    );
    invariant(AccountAddress.isValid({ input: pool }).valid, 'Pool is invalid');
    invariant(
      AccountAddress.isValid({ input: faOut }).valid,
      'Fa out is invalid'
    );
    invariant(amountIn > 0n, 'Amount in must be greater than 0');

    return {
      function: `${this.#package.address.toString()}::${this.#interfaceModule}::swap_coin_to_fa`,
      typeArguments: [coinIn],
      functionArguments: [pool, faOut, amountIn, minAmountOut, recipient],
    };
  }

  public addLiquidity({
    pool,
    fasIn,
    amounts,
    recipient,
    minAmountOut,
  }: AddLiquidityArgs): InputGenerateTransactionPayloadData {
    invariant(
      AccountAddress.isValid({ input: recipient }).valid,
      'Recipient is invalid'
    );
    invariant(fasIn.length > 0, 'Fas is required');
    invariant(amounts.length > 0, 'Amounts is required');
    invariant(
      amounts.length === fasIn.length,
      'Amounts and fas must be the same length'
    );
    invariant(
      all((x) => AccountAddress.isValid({ input: x }).valid, fasIn),
      'All fas must be valid'
    );

    return {
      function: `${this.#package.address.toString()}::${this.#interfaceModule}::add_liquidity`,
      functionArguments: [pool, fasIn, amounts, minAmountOut, recipient],
    };
  }

  public removeLiquidity({
    pool,
    amount,
    minAmountsOut = [0n, 0n, 0n, 0n, 0n, 0n, 0n],
    recipient,
  }: RemoveLiquidityArgs): InputGenerateTransactionPayloadData {
    invariant(AccountAddress.isValid({ input: pool }).valid, 'Pool is invalid');

    invariant(
      AccountAddress.isValid({ input: recipient }).valid,
      'Recipient is invalid'
    );
    invariant(amount > 0n, 'Amount must be greater than 0');

    return {
      function: `${this.#package.address.toString()}::${this.#interfaceModule}::remove_liquidity`,
      functionArguments: [pool, amount, minAmountsOut, recipient],
    };
  }

  public removeLiquidityOneFa({
    pool,
    faOut,
    amount,
    minAmountOut,
    recipient,
  }: RemoveLiquidityOneFaArgs): InputGenerateTransactionPayloadData {
    invariant(AccountAddress.isValid({ input: pool }).valid, 'Pool is invalid');
    invariant(
      AccountAddress.isValid({ input: faOut }).valid,
      'Fa out is invalid'
    );
    invariant(
      AccountAddress.isValid({ input: recipient }).valid,
      'Recipient is invalid'
    );
    invariant(amount > 0n, 'Amount must be greater than 0');

    return {
      function: `${this.#package.address.toString()}::${this.#interfaceModule}::remove_liquidity_one_fa`,
      functionArguments: [pool, faOut, amount, minAmountOut, recipient],
    };
  }

  public wrapCoin({
    coinType,
    amount,
    recipient,
  }: WrapCoinArgs): InputGenerateTransactionPayloadData {
    invariant(
      AccountAddress.isValid({ input: recipient }).valid,
      'Recipient is invalid'
    );
    invariant(amount > 0n, 'Amount must be greater than 0');

    return {
      function: `${this.#package.address.toString()}::${this.#interfaceModule}::wrap_coin`,
      functionArguments: [amount, recipient],
      typeArguments: [coinType],
    };
  }

  public stake({
    farm,
    amount,
    faIn,
  }: StakeArgs): InputGenerateTransactionPayloadData {
    invariant(AccountAddress.isValid({ input: farm }).valid, 'Farm is invalid');
    invariant(
      AccountAddress.isValid({ input: faIn }).valid,
      'Fa in is invalid'
    );
    invariant(amount > 0n, 'Amount must be greater than 0');

    return {
      function: `${this.#package.address.toString()}::${this.#interfaceModule}::stake_fa`,
      functionArguments: [farm, faIn, amount],
    };
  }

  public stakeCoin({
    farm,
    coinType,
    amount,
  }: StakeCoinArgs): InputGenerateTransactionPayloadData {
    invariant(AccountAddress.isValid({ input: farm }).valid, 'Farm is invalid');
    invariant(amount > 0n, 'Amount must be greater than 0');

    return {
      function: `${this.#package.address.toString()}::${this.#interfaceModule}::stake_coin`,
      functionArguments: [farm, amount],
      typeArguments: [coinType],
    };
  }

  public unstake({
    farm,
    amount,
    recipient,
  }: UnstakeArgs): InputGenerateTransactionPayloadData {
    invariant(AccountAddress.isValid({ input: farm }).valid, 'Farm is invalid');
    invariant(
      AccountAddress.isValid({ input: recipient }).valid,
      'Recipient is invalid'
    );
    invariant(amount > 0n, 'Amount must be greater than 0');

    return {
      function: `${this.#package.address.toString()}::${this.#interfaceModule}::unstake`,
      functionArguments: [farm, amount, recipient],
    };
  }

  public harvest({
    farm,
    faOut,
    recipient,
  }: HarvestArgs): InputGenerateTransactionPayloadData {
    invariant(AccountAddress.isValid({ input: farm }).valid, 'Farm is invalid');
    invariant(
      AccountAddress.isValid({ input: recipient }).valid,
      'Recipient is invalid'
    );
    invariant(
      AccountAddress.isValid({ input: faOut }).valid,
      'Fa out is invalid'
    );

    return {
      function: `${this.#package.address.toString()}::${this.#interfaceModule}::harvest`,
      functionArguments: [farm, faOut, recipient],
    };
  }

  public async quoteSwap({ pool, faIn, faOut, amountIn }: QuoteSwapArgs) {
    const payload: InputViewFunctionData = {
      function: `${this.#package.address.toString()}::${this.#routerModule}::quote_swap`,
      functionArguments: [pool, faIn, faOut, amountIn],
    };

    const data = await this.#client.view({ payload });

    return {
      amountOut: data[0],
      fee: data[1],
    };
  }

  public async quoteSwapCoinToFa({
    pool,
    coinIn,
    faOut,
    amountIn,
  }: QuoteSwapCoinToFaArgs) {
    const payload: InputViewFunctionData = {
      function: `${this.#package.address.toString()}::${this.#routerModule}::quote_swap_coin_to_fa`,
      functionArguments: [pool, faOut, amountIn],
      typeArguments: [coinIn],
    };

    const data = await this.#client.view({ payload });

    return {
      amountOut: data[0],
      fee: data[1],
    };
  }

  public async quoteSwapFaToCoin({
    pool,
    faIn,
    coinOut,
    amountIn,
  }: QuoteSwapFaToCoinArgs) {
    const payload: InputViewFunctionData = {
      function: `${this.#package.address.toString()}::${this.#routerModule}::quote_swap_fa_to_coin`,
      functionArguments: [pool, faIn, amountIn],
      typeArguments: [coinOut],
    };

    const data = await this.#client.view({ payload });

    return {
      amountOut: data[0],
      fee: data[1],
    };
  }

  public async quoteSwapCoinToCoin({
    pool,
    coinIn,
    coinOut,
    amountIn,
  }: QuoteSwapCoinToCoinArgs) {
    const payload: InputViewFunctionData = {
      function: `${this.#package.address.toString()}::${this.#routerModule}::quote_swap_coin_to_coin`,
      functionArguments: [pool, amountIn],
      typeArguments: [coinIn, coinOut],
    };

    const data = await this.#client.view({ payload });

    return {
      amountOut: data[0],
      fee: data[1],
    };
  }

  public async quoteAddLiquidity({ pool, amountsIn }: QuoteAddLiquidityArgs) {
    const payload: InputViewFunctionData = {
      function: `${this.#package.address.toString()}::${this.#routerModule}::quote_add_liquidity`,
      functionArguments: [pool, amountsIn],
    };

    const data = await this.#client.view({ payload });

    return {
      amountOut: data[0],
    };
  }

  public async quoteRemoveLiquidity({
    pool,
    amountIn,
  }: QuoteRemoveLiquidityArgs) {
    const payload: InputViewFunctionData = {
      function: `${this.#package.address.toString()}::${this.#routerModule}::quote_remove_liquidity`,
      functionArguments: [pool, amountIn],
    };

    const data = await this.#client.view({ payload });

    return {
      amountsOut: data[0],
    };
  }

  public async quoteRemoveLiquidityOneFa({
    pool,
    faOut,
    amountIn,
  }: QuoteRemoveLiquidityOneFaArgs) {
    const payload: InputViewFunctionData = {
      function: `${this.#package.address.toString()}::${this.#routerModule}::quote_remove_liquidity_one_fa`,
      functionArguments: [pool, faOut, amountIn],
    };

    const data = await this.#client.view({ payload });

    return {
      amountOut: data[0],
    };
  }

  public async quoteRemoveLiquidityOneCoin({
    pool,
    coinOut,
    amountIn,
  }: QuoteRemoveLiquidityOneCoinArgs) {
    const payload: InputViewFunctionData = {
      function: `${this.#package.address.toString()}::${this.#routerModule}::quote_remove_liquidity_one_coin`,
      functionArguments: [pool, amountIn],
      typeArguments: [coinOut],
    };

    const data = await this.#client.view({ payload });

    return {
      amountOut: data[0],
    };
  }

  public async getPool(pool: string) {
    const data = await this.#client.getAccountResources({
      accountAddress: AccountAddress.from(pool),
    });

    return toInterestPool(pool, data, this.network);
  }

  public async getPoolAddress({ fas, isStable }: GetPoolAddressArgs) {
    const payload: InputViewFunctionData = {
      function: `${this.#package.address.toString()}::pool::pool_address_safe`,
      functionArguments: [fas, isStable],
    };

    const data = await this.#client.view({ payload });

    return {
      exists: data[0],
      poolAddress: data[1],
    };
  }

  public async getFAMetadata(fa: string): Promise<FaPayload> {
    const payload = await this.#client.getAccountResources({
      accountAddress: AccountAddress.from(fa),
    });

    return toFaPayload(payload);
  }

  public async getFaPrimaryStore({ owner, fa }: GetFaPrimaryStoreArgs) {
    try {
      const payload: InputViewFunctionData = {
        function: `0x1::primary_fungible_store::primary_store`,
        functionArguments: [owner, fa],
        typeArguments: ['0x1::fungible_asset::Metadata'],
      };

      const data = await this.#client.view({ payload });

      invariant(data.length > 0, 'Data is empty');

      const inner = propOr('', 'inner', data[0]);

      invariant(inner, 'Inner is empty');

      const x = await this.#client.getAccountResource({
        accountAddress: inner as `${string}::${string}::${string}`,
        resourceType: TYPES[this.network].FUNGIBLE_STORE,
      });

      const key: string = pathOr('', ['metadata', 'inner'], x);

      return {
        balance: BigInt(propOr(0, 'balance', x)),
        frozen: propOr(false, 'frozen', x),
        fa: FUNGIBLE_ASSETS[this.network][key],
      };
    } catch {
      return {
        balance: BigInt(0),
        frozen: false,
        fa: FUNGIBLE_ASSETS[this.network][fa],
      };
    }
  }

  public async getPoolPage({ pageSize, start }: GetPoolPageArgs) {
    invariant(pageSize > 0, 'Page size must be greater than 0');

    const payload: InputViewFunctionData = {
      function: `${this.#package.address.toString()}::${this.#queryModule}::get_pool_page`,
      functionArguments: [start, pageSize],
    };

    return this.#client.view({ payload });
  }

  #assertNewVolatilePoolArgs({
    prices,
    midFee,
    outFee,
    gammaFee,
    a,
    gamma,
    extraProfit,
    adjustmentStep,
    maHalfTime,
    assets,
  }: AssertNewVolatilePoolArgs) {
    invariant(
      prices.length > 0 && assets.length - 1 === prices.length,
      'You must provide prices'
    );
    invariant(
      this.MAX_FEE > midFee && midFee >= this.MIN_FEE,
      `Mid Fee must be lower than: ${this.MAX_FEE}`
    );
    invariant(
      this.MAX_FEE > outFee && outFee >= this.MIN_FEE,
      `Out Fee must be lower than: ${this.MAX_FEE}`
    );
    invariant(
      !!gammaFee && this.PRECISION >= gammaFee,
      `Gamma fee must be lower of equal to: ${this.PRECISION}`
    );
    invariant(
      this.PRECISION > extraProfit,
      `Extra profit must be lower of equal to: ${this.PRECISION}`
    );
    invariant(
      this.PRECISION > adjustmentStep,
      `Adjustment step must be lower of equal to: ${this.PRECISION}`
    );
    invariant(
      maHalfTime > 1000 && this.MAX_MA_HALF_TIME >= maHalfTime,
      `Ma half time must be lower than: ${this.MAX_MA_HALF_TIME}`
    );
    invariant(
      this.MAX_GAMMA > gamma && gamma >= this.MIN_GAMMA,
      `Gamma must be lower than ${this.MAX_GAMMA} and higher than ${this.MIN_GAMMA}`
    );
    invariant(
      this.#min_volatile_a(prices.length + 1) <= a &&
        a <= this.#max_volatile_a(prices.length + 1),
      `A must be between ${this.#min_volatile_a(prices.length + 1)} and ${this.#max_volatile_a(prices.length + 1)}`
    );
  }

  #min_volatile_a(x: number): bigint {
    const nCoins = BigInt(x);
    return (nCoins ** nCoins * 10_000n) / 100n;
  }

  #max_volatile_a(x: number): bigint {
    const nCoins = BigInt(x);
    return nCoins ** nCoins * 10_000n * 1000n;
  }
}
