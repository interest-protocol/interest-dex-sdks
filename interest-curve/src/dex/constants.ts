import { AccountAddress } from '@aptos-labs/ts-sdk';

import { Package } from './dex.types';

export enum Network {
  Bardock = 'bardock',
  MovementMainnet = 'movementMainnet',
}

export const PACKAGES = {
  [Network.MovementMainnet]: {
    name: 'interest_curve',
    address: AccountAddress.from(
      '0x373aab3f20ef3c31fc4caa287b0f18170f4a0b4a28c80f7ee79434458f70f241'
    ),
  },
  [Network.Bardock]: {
    name: 'interest_curve',
    address: AccountAddress.from(
      '0x373aab3f20ef3c31fc4caa287b0f18170f4a0b4a28c80f7ee79434458f70f241'
    ),
  },
} as Record<Network, Package>;

export const COIN_TYPES = {
  [Network.MovementMainnet]: {
    MOVE: '0x1::aptos_coin::AptosCoin',
  },
  [Network.Bardock]: {
    MOVE: '0x1::aptos_coin::AptosCoin',
  },
} as const;

export const COINS = {
  [Network.MovementMainnet]: {
    [COIN_TYPES[Network.MovementMainnet].MOVE]: {
      type: '0x1::aptos_coin::AptosCoin',
      symbol: 'MOVE',
      name: 'Move Coin',
      iconUri: '',
      decimals: 8,
    },
  },
  [Network.Bardock]: {
    [COIN_TYPES[Network.Bardock].MOVE]: {
      type: '0x1::aptos_coin::AptosCoin',
      symbol: 'MOVE',
      name: 'Move Coin',
      iconUri: '',
      decimals: 8,
    },
  },
} as const;

export const FA_ADDRESSES = {
  [Network.MovementMainnet]: {
    MOVE: AccountAddress.from('0xa'),
  },
  [Network.Bardock]: {
    MOVE: AccountAddress.from('0xa'),
  },
} as const;

export const FUNGIBLE_ASSETS = {
  [Network.MovementMainnet]: {
    [FA_ADDRESSES[Network.MovementMainnet].MOVE.toString()]: {
      symbol: 'MOVE',
      name: 'Move Coin',
      address: FA_ADDRESSES[Network.MovementMainnet].MOVE,
      iconUri: '',
      decimals: 8,
    },
  },
  [Network.Bardock]: {
    [FA_ADDRESSES[Network.Bardock].MOVE.toString()]: {
      symbol: 'MOVE',
      name: 'Move Coin',
      address: FA_ADDRESSES[Network.Bardock].MOVE,
      iconUri: '',
      decimals: 8,
    },
  },
} as const;

export const TYPES = {
  [Network.MovementMainnet]: {
    PAIRED_COIN_TYPE: '0x1::coin::PairedCoinType',
    CONCURRENT_SUPPLY: '0x1::fungible_asset::ConcurrentSupply',
    FA_METADATA: '0x1::fungible_asset::Metadata',
    OBJECT_CORE: '0x1::object::ObjectCore',
    COIN_STORE: '0x1::coin::CoinStore',
    FUNGIBLE_STORE: '0x1::fungible_asset::FungibleStore',
    INTEREST_POOL: `${PACKAGES[Network.MovementMainnet].address.toString()}::interest_curve_pool::InterestCurvePool`,
    VOLATILE_STATE: `${PACKAGES[Network.MovementMainnet].address.toString()}::volatile_pool::VolatileState`,
  },
  [Network.Bardock]: {
    PAIRED_COIN_TYPE: '0x1::coin::PairedCoinType',
    CONCURRENT_SUPPLY: '0x1::fungible_asset::ConcurrentSupply',
    FA_METADATA: '0x1::fungible_asset::Metadata',
    OBJECT_CORE: '0x1::object::ObjectCore',
    COIN_STORE: '0x1::coin::CoinStore',
    FUNGIBLE_STORE: '0x1::fungible_asset::FungibleStore',
    INTEREST_POOL: `${PACKAGES[Network.Bardock].address.toString()}::interest_curve_pool::InterestCurvePool`,
    VOLATILE_STATE: `${PACKAGES[Network.Bardock].address.toString()}::volatile_pool::VolatileState`,
  },
} as const;

export const DEFAULT_VOLATILE_POOL = {
  extendRef: '',
  isStable: false,
  address: '',
  supply: {
    maxValue: BigInt(0),
    value: BigInt(0),
  },
  adminFungibleStore: {
    type: '',
    address: '',
    balance: BigInt(0),
  },
  lpFaMetadata: {
    decimals: 0,
    iconURI: '',
    name: '',
    projectURI: '',
    symbol: '',
  },
  nFas: 0,
  fas: [],
  data: {
    a: '',
    futureA: '',
    futureGamma: '',
    futureTime: '',
    gamma: '',
    initialTime: '',
    virtualPrice: BigInt(0),
    xcpProfit: BigInt(0),
    xcpProfitA: BigInt(0),
    prices: {},
    fees: {
      midFee: BigInt(0),
      outFee: BigInt(0),
      gammaFee: BigInt(0),
      adminFee: BigInt(0),
    },
    futureFees: {
      midFee: BigInt(0),
      outFee: BigInt(0),
      gammaFee: BigInt(0),
      adminFee: BigInt(0),
    },
    lastPricesTimestamp: BigInt(0),
    maxA: BigInt(0),
    minA: BigInt(0),
    rebalancingParams: {
      extraProfit: BigInt(0),
      adjustmentStep: BigInt(0),
      maHalfTime: BigInt(0),
    },
    futureRebalancingParams: {
      extraProfit: BigInt(0),
      adjustmentStep: BigInt(0),
      maHalfTime: BigInt(0),
    },
    balances: [],
    d: BigInt(0),
  },
};
