import { AccountAddress, Aptos } from '@aptos-labs/ts-sdk';

import { Network } from './constants';

export interface Package {
  name: string;
  address: AccountAddress;
}

export interface StructTag {
  name: string;
  module: string;
  address: string;
  typeParams: Array<string | StructTag>;
}

export interface ConstructorArgs {
  client?: Aptos;
  network?: Network;
}

export interface CreateFaArgs {
  name: string;
  symbol: string;
  decimals?: number;
  iconURI?: string;
  projectURI?: string;
  totalSupply: bigint;
  recipient: string;
}

export interface DeployMemeWithFaArgs extends CreateFaArgs {
  liquidityMemeAmount: bigint;
  liquidityAptosAmount: bigint;
}

export interface DeployMemeWithCoinArgs extends CreateFaArgs {
  liquidityMemeAmount: bigint;
  liquidityAptosAmount: bigint;
}

export interface AddLiquidityCoinsArgs {
  coinA: string;
  coinB: string;
  amountA: bigint;
  amountB: bigint;
  recipient: string;
}

export interface AddLiquidityOneCoinArgs {
  coinA: string;
  faB: string;
  amountA: bigint;
  amountB: bigint;
  recipient: string;
}

export interface AddLiquidityArgs {
  faA: string;
  faB: string;
  amountA: bigint;
  amountB: bigint;
  recipient: string;
}

export interface RemoveLiquidityArgs {
  lpFa: string;
  amount: bigint;
  recipient: string;
}

export interface WrapCoinArgs {
  coin: string;
  amount: bigint;
  recipient: string;
}

export interface GetPoolAddressArgs {
  faA: string;
  faB: string;
}

export interface SwapPathArgs {
  path: string[];
  amountIn: bigint;
  minAmountOut: bigint;
  recipient: string;
}

export interface SwapPathCoinInArgs {
  path: string[];
  coinIn: string;
  amountIn: bigint;
  minAmountOut: bigint;
  recipient: string;
}

export interface QuotePathAmountArgs {
  path: string[];
  amount: bigint;
}

export interface GetPoolPageArgs {
  start: number;
  pageSize: number;
}

export interface GetPoolFromFasArgs {
  faA: string;
  faB: string;
}

export interface InterestV2Pool {
  poolAddress: AccountAddress;
  metadataX: AccountAddress;
  metadataY: AccountAddress;
  balanceX: bigint;
  balanceY: bigint;
  supply: bigint;
  bidLiquidity: bigint;
  isSrMode: boolean;
  slotBalanceX: bigint;
  slotBalanceY: bigint;
  lastSlotTimestamp: bigint;
}

export interface AmountOutArgs {
  amountIn: bigint;
  balanceIn: bigint;
  balanceOut: bigint;
}

export interface QuoteAmountOutArgs {
  pool: InterestV2Pool;
  amountIn: bigint;
  fee: bigint;
}

export interface GetSrAmountOutArgs {
  bidLiquidity: bigint;
  balanceX: bigint;
  balanceY: bigint;
  slotBalanceX: bigint;
  slotBalanceY: bigint;
  amountIn: bigint;
}

export interface GetAmountOutArgs {
  pool: InterestV2Pool;
  amountIn: bigint;
  fee: bigint;
  metadataOut: string;
}
