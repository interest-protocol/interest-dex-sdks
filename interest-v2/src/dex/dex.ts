import {
  AccountAddress,
  Aptos,
  InputGenerateTransactionPayloadData,
  InputViewFunctionData,
  MoveValue,
} from '@aptos-labs/ts-sdk';

import invariant from 'tiny-invariant';

import {
  ConstructorArgs,
  Package,
  CreateFaArgs,
  DeployMemeWithFaArgs,
  DeployMemeWithCoinArgs,
  AddLiquidityCoinsArgs,
  AddLiquidityOneCoinArgs,
  AddLiquidityArgs,
  RemoveLiquidityArgs,
  WrapCoinArgs,
  GetPoolAddressArgs,
  SwapPathArgs,
  SwapPathCoinInArgs,
  QuotePathAmountArgs,
  GetPoolPageArgs,
  GetPoolFromFasArgs,
  AmountOutArgs,
  InterestV2Pool,
  QuoteAmountOutArgs,
  GetSrAmountOutArgs,
  GetAmountOutArgs,
} from './dex.types';
import { PACKAGES, Network } from './constants';
import { getDefaultConstructorArgs, toConfig, hexToUtf8 } from './utils';
import { FA_ADDRESSES, COIN_TYPES } from './constants';
import { propOr, pathOr } from 'ramda';

export class InterestV2 {
  #client: Aptos;
  #package: Package;
  #utilsPackage: Package;
  #interfaceModule = 'interest_v2_entry';
  #routerModule = 'interest_v2_router';
  #ammModule = 'interest_v2_pool';
  #queryModule = 'interest_v2_query';

  network: Network;
  feePrecision = 1_000_000_000n;

  constructor(args: ConstructorArgs | undefined | null = null) {
    const data = {
      ...getDefaultConstructorArgs(),
      ...args,
    };

    invariant(data.client, 'Client is required');
    invariant(data.network, 'Network is required');
    invariant(PACKAGES[data.network], 'Invalid network');

    this.#client = data.client;
    this.#package = PACKAGES[data.network].INTEREST_V2;
    this.#utilsPackage = PACKAGES[data.network].UTILS;
    this.network = data.network;
  }

  public createFa({
    name,
    symbol,
    decimals = 8,
    iconURI = '',
    projectURI = '',
    totalSupply,
    recipient,
  }: CreateFaArgs): InputGenerateTransactionPayloadData {
    invariant(
      AccountAddress.isValid({ input: recipient }).valid,
      'Invalid recipient'
    );
    invariant(totalSupply > 0n, 'Total supply is required');

    return {
      function: `${this.#package.address}::${this.#interfaceModule}::create_fa`,
      functionArguments: [
        name,
        symbol,
        decimals,
        iconURI,
        projectURI,
        totalSupply,
        recipient,
      ],
    };
  }

  public updateFaPaymentAmount(
    amount: bigint
  ): InputGenerateTransactionPayloadData {
    return {
      function: `${this.#package.address}::config::update_fa_payment_amount`,
      functionArguments: [amount],
    };
  }

  public deployMemeWithCoin({
    name,
    symbol,
    decimals = 8,
    iconURI = '',
    projectURI = '',
    totalSupply,
    recipient,
    liquidityMemeAmount,
    liquidityAptosAmount,
  }: DeployMemeWithCoinArgs): InputGenerateTransactionPayloadData {
    invariant(
      AccountAddress.isValid({ input: recipient }).valid,
      'Invalid recipient'
    );
    invariant(totalSupply > 0n, 'Total supply is required');
    invariant(
      liquidityMemeAmount > 0n && totalSupply >= liquidityMemeAmount,
      'Liquidity meme amount is required'
    );
    invariant(liquidityAptosAmount > 0n, 'Liquidity aptos amount is required');

    return {
      function: `${this.#package.address}::${this.#interfaceModule}::deploy_meme_with_coin`,
      functionArguments: [
        name,
        symbol,
        decimals,
        iconURI,
        projectURI,
        totalSupply,
        liquidityAptosAmount,
        liquidityMemeAmount,
        recipient,
      ],
      typeArguments: [COIN_TYPES[this.network].MOVE],
    };
  }

  public deployMemeWithFa({
    name,
    symbol,
    decimals = 8,
    iconURI = '',
    projectURI = '',
    totalSupply,
    recipient,
    liquidityMemeAmount,
    liquidityAptosAmount,
  }: DeployMemeWithFaArgs): InputGenerateTransactionPayloadData {
    invariant(
      AccountAddress.isValid({ input: recipient }).valid,
      'Invalid recipient'
    );
    invariant(totalSupply > 0n, 'Total supply is required');
    invariant(
      liquidityMemeAmount > 0n && totalSupply >= liquidityMemeAmount,
      'Liquidity meme amount is required'
    );
    invariant(liquidityAptosAmount > 0n, 'Liquidity aptos amount is required');

    return {
      function: `${this.#package.address}::${this.#interfaceModule}::deploy_meme_with_fa`,
      functionArguments: [
        FA_ADDRESSES[this.network].MOVE.toString(),
        name,
        symbol,
        decimals,
        iconURI,
        projectURI,
        totalSupply,
        liquidityAptosAmount,
        liquidityMemeAmount,
        recipient,
      ],
    };
  }

  public addLiquidity({
    faA,
    faB,
    amountA,
    amountB,
    recipient,
  }: AddLiquidityArgs): InputGenerateTransactionPayloadData {
    invariant(AccountAddress.isValid({ input: faA }).valid, 'FA A is required');
    invariant(AccountAddress.isValid({ input: faB }).valid, 'FA B is required');
    invariant(amountA > 0n, 'Amount A is required');
    invariant(amountB > 0n, 'Amount B is required');
    invariant(
      AccountAddress.isValid({ input: recipient }).valid,
      'Invalid recipient'
    );

    return {
      function: `${this.#package.address}::${this.#interfaceModule}::add_liquidity`,
      functionArguments: [faA, faB, amountA, amountB, recipient],
    };
  }

  public addLiquidityCoins({
    coinA,
    coinB,
    amountA,
    amountB,
    recipient,
  }: AddLiquidityCoinsArgs): InputGenerateTransactionPayloadData {
    invariant(coinA, 'Coin A is required');
    invariant(coinB, 'Coin B is required');
    invariant(amountA > 0n, 'Amount A is required');
    invariant(amountB > 0n, 'Amount B is required');
    invariant(
      AccountAddress.isValid({ input: recipient }).valid,
      'Invalid recipient'
    );
    return {
      function: `${this.#package.address}::${this.#interfaceModule}::add_liquidity_coins`,
      functionArguments: [amountA, amountB, recipient],
      typeArguments: [coinA, coinB],
    };
  }

  public addLiquidityOneCoin({
    coinA,
    faB,
    amountA,
    amountB,
    recipient,
  }: AddLiquidityOneCoinArgs): InputGenerateTransactionPayloadData {
    invariant(coinA, 'Coin A is required');
    invariant(AccountAddress.isValid({ input: faB }).valid, 'FA B is required');
    invariant(amountA > 0n, 'Amount A is required');
    invariant(amountB > 0n, 'Amount B is required');
    invariant(
      AccountAddress.isValid({ input: recipient }).valid,
      'Invalid recipient'
    );

    return {
      function: `${this.#package.address}::${this.#interfaceModule}::add_liquidity_one_coin`,
      functionArguments: [faB, amountA, amountB, recipient],
      typeArguments: [coinA],
    };
  }

  public removeLiquidity({
    lpFa,
    amount,
    recipient,
  }: RemoveLiquidityArgs): InputGenerateTransactionPayloadData {
    invariant(
      AccountAddress.isValid({ input: lpFa }).valid,
      'LP FA is required'
    );
    invariant(amount > 0n, 'Amount is required');
    invariant(
      AccountAddress.isValid({ input: recipient }).valid,
      'Invalid recipient'
    );

    return {
      function: `${this.#package.address}::${this.#interfaceModule}::remove_liquidity`,
      functionArguments: [lpFa, amount, recipient],
    };
  }

  public wrapCoin({
    coin,
    amount,
    recipient,
  }: WrapCoinArgs): InputGenerateTransactionPayloadData {
    return {
      function: `${this.#utilsPackage.address}::coin_wrapper::wrap_coin`,
      functionArguments: [amount, recipient],
      typeArguments: [coin],
    };
  }

  public swapPath({
    path,
    amountIn,
    minAmountOut,
    recipient,
  }: SwapPathArgs): InputGenerateTransactionPayloadData {
    invariant(path.length >= 2, 'Path is required');
    invariant(amountIn > 0n, 'Amount in is required');
    invariant(
      AccountAddress.isValid({ input: recipient }).valid,
      'Invalid recipient'
    );

    return {
      function: `${this.#package.address}::${this.#interfaceModule}::swap_path`,
      functionArguments: [path, amountIn, minAmountOut, recipient],
    };
  }

  public swapPathCoinIn({
    path,
    coinIn,
    amountIn,
    minAmountOut,
    recipient,
  }: SwapPathCoinInArgs): InputGenerateTransactionPayloadData {
    invariant(path.length >= 1, 'Path is required');
    invariant(amountIn > 0n, 'Amount in is required');
    invariant(
      AccountAddress.isValid({ input: recipient }).valid,
      'Invalid recipient'
    );

    return {
      function: `${this.#package.address}::${this.#interfaceModule}::swap_path_coin_in`,
      functionArguments: [path, amountIn, minAmountOut, recipient],
      typeArguments: [coinIn],
    };
  }

  public async pathExists(fas: string[]) {
    invariant(fas.length >= 2, 'Path is required');
    const payload: InputViewFunctionData = {
      function: `${this.#package.address.toString()}::${this.#routerModule}::path_exists`,
      functionArguments: [fas],
    };

    const data = await this.#client.view({ payload });

    return data[0] as boolean;
  }

  public async getPoolAddress({ faA, faB }: GetPoolAddressArgs) {
    const payload: InputViewFunctionData = {
      function: `${this.#package.address.toString()}::${this.#ammModule}::pool_address_safe`,
      functionArguments: [faA, faB],
    };

    const data = await this.#client.view({ payload });

    return {
      exists: data[0] as boolean,
      poolAddress: AccountAddress.from(data[1] as string),
    };
  }

  public async quotePathAmountOut({ path, amount }: QuotePathAmountArgs) {
    const payload: InputViewFunctionData = {
      function: `${this.#package.address.toString()}::${this.#routerModule}::quote_path_amount_out`,
      functionArguments: [path, amount],
    };

    const data = await this.#client.view({ payload });

    return {
      amountOut: BigInt(data[0] as string),
      fees: (data[1] as MoveValue[]).map((fee) => BigInt(fee as string)),
    };
  }

  public async quotePathAmountIn({ path, amount }: QuotePathAmountArgs) {
    const payload: InputViewFunctionData = {
      function: `${this.#package.address.toString()}::${this.#routerModule}::quote_path_amount_in`,
      functionArguments: [path, amount],
    };

    const data = await this.#client.view({ payload });

    return {
      amountIn: BigInt(data[0] as string),
      fees: (data[1] as MoveValue[]).map((fee) => BigInt(fee as string)),
    };
  }

  public async pairedMetadata(coinType: string) {
    const payload: InputViewFunctionData = {
      function: `${this.#utilsPackage.address.toString()}::coin_wrapper::paired_metadata`,
      typeArguments: [coinType],
    };

    try {
      const data = await this.#client.view({ payload });

      return propOr(null, 'inner', data[0]);
    } catch {
      return null;
    }
  }

  public async pairedCoin(fa: string) {
    const payload: InputViewFunctionData = {
      function: `0x1::coin::paired_coin`,
      functionArguments: [fa],
    };

    try {
      const data = await this.#client.view({ payload });

      const tag = (propOr([], 'vec', data[0]) as Object[])[0] as {
        account_address: string;
        module_name: string;
        struct_name: string;
      };

      return `0x1::${hexToUtf8(tag.module_name)}::${hexToUtf8(tag.struct_name)}`;
    } catch {
      return null;
    }
  }

  public async getConfig() {
    const data = await this.#client.getAccountResources({
      accountAddress: this.#package.address,
    });

    return toConfig(data, this.network);
  }

  public async getPool(pool: string): Promise<InterestV2Pool> {
    const payload: InputViewFunctionData = {
      function: `${this.#package.address.toString()}::${this.#queryModule}::pool_info`,
      functionArguments: [pool],
    };

    const data = await this.#client.view({ payload });

    invariant(data.length === 11, 'Invalid data');

    return this.#poolFromData(data);
  }

  public async getPoolFromFas({ faA, faB }: GetPoolFromFasArgs) {
    const pool = await this.getPoolAddress({ faA, faB });

    invariant(pool.exists, 'Pool does not exist');
    invariant(pool.poolAddress.toString(), 'Pool address is required');

    const payload: InputViewFunctionData = {
      function: `${this.#package.address.toString()}::${this.#queryModule}::pool_info`,
      functionArguments: [pool.poolAddress],
    };

    const data = await this.#client.view({ payload });

    invariant(data.length === 11, 'Invalid data');

    return this.#poolFromData(data);
  }

  public async getPoolPage({ pageSize, start }: GetPoolPageArgs) {
    invariant(pageSize > 0, 'Page size must be greater than 0');

    const payload: InputViewFunctionData = {
      function: `${this.#package.address.toString()}::${this.#queryModule}::get_pool_page`,
      functionArguments: [start, pageSize],
    };

    const page = await this.#client.view({ payload });

    if (!page.length) return null;

    const x = page[0];

    const nextIndex = pathOr([], ['next_index', 'vec'], x);
    const pools: Record<string, MoveValue>[] = propOr([], 'pools', x);

    return {
      hasNextPage: propOr(false, 'has_next_page', x),
      nextIndex: nextIndex.length ? Number(nextIndex[0]) : null,
      pools: pools.map((elem: Record<string, MoveValue>) => ({
        poolAddress: AccountAddress.from(propOr('0x0', 'pool_address', x)),
        metadataX: AccountAddress.from(propOr('0x0', 'fa_x', elem)),
        metadataY: AccountAddress.from(propOr('0x0', 'fa_y', elem)),
        balanceX: BigInt(propOr('0', 'balance_x', elem)),
        balanceY: BigInt(propOr('0', 'balance_y', elem)),
        supply: BigInt(propOr('0', 'supply', elem)),
        bidLiquidity: BigInt(propOr('0', 'bid_liquidity', elem)),
        isSrMode: propOr(false, 'is_sr_mode', elem),
        slotBalanceX: BigInt(propOr('0', 'slot_balance_x', elem)),
        slotBalanceY: BigInt(propOr('0', 'slot_balance_y', elem)),
        lastSlotTimestamp: BigInt(propOr('0', 'last_slot_timestamp', elem)),
      })) as InterestV2Pool[],
      totalPools: propOr(0, 'total_pools', x),
    };
  }

  #poolFromData(data: MoveValue[]) {
    return {
      poolAddress: AccountAddress.from(data[0] as string),
      metadataX: AccountAddress.from(data[1] as string),
      metadataY: AccountAddress.from(data[2] as string),
      balanceX: BigInt(data[3] as string),
      balanceY: BigInt(data[4] as string),
      supply: BigInt(data[5] as string),
      bidLiquidity: BigInt(data[6] as string),
      isSrMode: data[7] as boolean,
      slotBalanceX: BigInt(data[8] as string),
      slotBalanceY: BigInt(data[9] as string),
      lastSlotTimestamp: BigInt(data[10] as string),
    };
  }

  getAmountOut({ pool, amountIn, fee, metadataOut }: GetAmountOutArgs) {
    return AccountAddress.from(metadataOut).equals(pool.metadataX)
      ? this.#quoteAmountOutX({ pool, amountIn, fee })
      : this.#quoteAmountOutY({ pool, amountIn, fee });
  }

  #quoteAmountOutX({ pool, amountIn, fee }: QuoteAmountOutArgs) {
    if (amountIn === 0n) return 0n;

    const feeAmount = this.#calculateFee(amountIn, fee);
    const amountInExcludingFee = amountIn - feeAmount;

    if (pool.balanceX === 0n || pool.balanceY === 0n) return 0n;

    return this.#amountOut({
      amountIn: amountInExcludingFee,
      balanceIn: pool.balanceY,
      balanceOut: pool.balanceX,
    });
  }

  #quoteAmountOutY({ pool, amountIn, fee }: QuoteAmountOutArgs) {
    if (amountIn === 0n) return 0n;

    const feeAmount = this.#calculateFee(amountIn, fee);
    const amountInExcludingFee = amountIn - feeAmount;

    if (pool.balanceX === 0n || pool.balanceY === 0n) return 0n;

    if (!pool.isSrMode)
      return this.#amountOut({
        amountIn: amountInExcludingFee,
        balanceIn: pool.balanceX,
        balanceOut: pool.balanceY,
      });

    return this.#getSrAmountOut({
      bidLiquidity: pool.bidLiquidity,
      balanceX: pool.balanceX,
      balanceY: pool.balanceY,
      slotBalanceX: pool.slotBalanceX,
      slotBalanceY: pool.slotBalanceY,
      amountIn: amountInExcludingFee,
    });
  }

  #getSrAmountOut({
    bidLiquidity,
    balanceX,
    balanceY,
    slotBalanceX,
    slotBalanceY,
    amountIn,
  }: GetSrAmountOutArgs) {
    if (bidLiquidity >= amountIn)
      return this.#amountOut({
        amountIn,
        balanceIn: slotBalanceX,
        balanceOut: slotBalanceY,
      });

    const remainingAmountIn = amountIn - bidLiquidity;

    const amountOutFromLiquidity =
      bidLiquidity === 0n
        ? 0n
        : this.#amountOut({
            amountIn: bidLiquidity,
            balanceIn: slotBalanceX,
            balanceOut: slotBalanceY,
          });

    const remainingAmountOut = this.#amountOut({
      amountIn: remainingAmountIn,
      balanceIn: balanceX + bidLiquidity,
      balanceOut: balanceY - amountOutFromLiquidity,
    });

    return amountOutFromLiquidity + remainingAmountOut;
  }

  #amountOut({ amountIn, balanceIn, balanceOut }: AmountOutArgs) {
    const numerator = balanceOut * amountIn;
    const denominator = balanceIn + amountIn;

    return numerator / denominator;
  }

  #calculateFee(amount: bigint, fee: bigint) {
    return this.#mulDivUp(amount, fee, this.feePrecision);
  }

  #mulDivUp(x: bigint, y: bigint, z: bigint) {
    const r = (x * y) / z;

    return r + ((x * y) % z > 0n ? 1n : 0n);
  }
}
