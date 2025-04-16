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

export const WHITELISTED_FAS = {
  MOVE: AccountAddress.from('0xa'),
  USDCe: AccountAddress.from(
    '0x83121c9f9b0527d1f056e21a950d6bf3b9e9e2e8353d0e95ccea726713cbea39'
  ),
  USDTe: AccountAddress.from(
    '0x447721a30109c662dde9c73a0c2c9c9c459fb5e5a9c92f03c50fa69737f5d08d'
  ),
  WETHe: AccountAddress.from(
    '0x908828f4fb0213d4034c3ded1630bbd904e8a3a6bf3c63270887f0b06653a376'
  ),
  WBTCe: AccountAddress.from(
    '0xb06f29f24dde9c6daeec1f930f14a441a8d6c0fbea590725e88b340af3e1939c'
  ),
  FIRE: AccountAddress.from(
    '0x5f7f59e38a96dfe79830f53fe49a19e770f70a13ff30ce598a49e8f0a2b46861'
  ),
};

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

export const BLACKLISTED_POOLS = [
  // Stable USDCe/MOVE
  AccountAddress.from(
    '0xc4d03e70f504bcf04f21f975cf2eb94723fbe221d834a7a6b0bc72303281d7da'
  ),
  // Volatile Move/Test123
  AccountAddress.from(
    '0x486cc5aacea27797e8f47971ac5b0bc301d1aafd9b5510811360a7d28768ad39'
  ),
  // Volatile Move/Test
  AccountAddress.from(
    '0xdfa2be63f0a812001c537a9dd283b76bb31138846a9129bd39855979f04ab87b'
  ),
];

export const WHITELISTED_CURVE_LP_COINS = {
  USDCe_USDTe_STABLE: AccountAddress.from(
    '0x54c89a961dd60e30f1c03ba2c6f5a052e7ed0ba36fcca3c1153f06449199b285'
  ),
  USDCe_MOVE_VOLATILE: AccountAddress.from(
    '0x691877d4f5d4c1177d02f6ca3d399df4624af265533d305c008f6cb15d1567bc'
  ),
  USDTe_MOVE_VOLATILE: AccountAddress.from(
    '0x12061cb8e5a17ae7d34dd3371479f7cec323e4ad16b8991792fb496d739e87af'
  ),
  USDCe_WETHe_VOLATILE: AccountAddress.from(
    '0x110a99c29036cf12de428f55c6c1e1838578e3db6d17a0b3b4e6d2e101d124f1'
  ),
  WETHe_MOVE_VOLATILE: AccountAddress.from(
    '0x89d75aae2a4cc65660bd28d989582a69a3c1579ed32d965d346f21e5bf191330'
  ),
};

export const FUNGIBLE_ASSETS = {
  [WHITELISTED_FAS.MOVE.toString()]: {
    symbol: 'MOVE',
    name: 'Move Coin',
    address: WHITELISTED_FAS.MOVE,
    iconUri: '',
    decimals: 8,
  },
  [WHITELISTED_FAS.USDCe.toString()]: {
    symbol: 'USDC.e',
    name: 'USDC.e',
    address: WHITELISTED_FAS.USDCe,
    iconUri: '',
    decimals: 6,
  },
  [WHITELISTED_FAS.USDTe.toString()]: {
    symbol: 'USDT.e',
    name: 'USDT.e',
    address: WHITELISTED_FAS.USDTe,
    iconUri: '',
    decimals: 6,
  },
  [WHITELISTED_FAS.WETHe.toString()]: {
    symbol: 'WETH.e',
    name: 'WETH.e',
    address: WHITELISTED_FAS.WETHe,
    iconUri: '',
    decimals: 8,
  },
  [WHITELISTED_FAS.WBTCe.toString()]: {
    symbol: 'WBTC.e',
    name: 'WBTC.e',
    address: WHITELISTED_FAS.WBTCe,
    iconUri: '',
    decimals: 8,
  },
  [WHITELISTED_FAS.FIRE.toString()]: {
    symbol: 'FIRE',
    name: 'Fire Coin',
    address: WHITELISTED_FAS.FIRE,
    iconUri: '',
    decimals: 8,
  },
  [WHITELISTED_CURVE_LP_COINS.USDCe_USDTe_STABLE.toString()]: {
    symbol: 'USDCe-USDTe Stable',
    name: 'USDCe-USDTe Stable',
    address: WHITELISTED_CURVE_LP_COINS.USDCe_USDTe_STABLE,
    iconUri: '',
    decimals: 9,
  },
  [WHITELISTED_CURVE_LP_COINS.USDCe_MOVE_VOLATILE.toString()]: {
    symbol: 'USDCe-MOVE Volatile',
    name: 'USDCe-MOVE Volatile',
    address: WHITELISTED_CURVE_LP_COINS.USDCe_MOVE_VOLATILE,
    iconUri: '',
    decimals: 9,
  },
  [WHITELISTED_CURVE_LP_COINS.USDTe_MOVE_VOLATILE.toString()]: {
    symbol: 'USDTe-MOVE Volatile',
    name: 'USDTe-MOVE Volatile',
    address: WHITELISTED_CURVE_LP_COINS.USDTe_MOVE_VOLATILE,
    iconUri: '',
    decimals: 9,
  },
  [WHITELISTED_CURVE_LP_COINS.USDCe_WETHe_VOLATILE.toString()]: {
    symbol: 'USDCe-WETHe Volatile',
    name: 'USDCe-WETHe Volatile',
    address: WHITELISTED_CURVE_LP_COINS.USDCe_WETHe_VOLATILE,
    iconUri: '',
    decimals: 9,
  },
  [WHITELISTED_CURVE_LP_COINS.WETHe_MOVE_VOLATILE.toString()]: {
    symbol: 'WETHe-MOVE Volatile',
    name: 'WETHe-MOVE Volatile',
    address: WHITELISTED_CURVE_LP_COINS.WETHe_MOVE_VOLATILE,
    iconUri: '',
    decimals: 9,
  },
};

export const MAINNET_POOLS = {
  [WHITELISTED_CURVE_LP_COINS.USDCe_USDTe_STABLE.toString()]: {
    isStable: false,
    address: AccountAddress.from(
      '0x54c89a961dd60e30f1c03ba2c6f5a052e7ed0ba36fcca3c1153f06449199b285'
    ),
    name: 'USDCe-USDTe Stable',
    fas: [WHITELISTED_FAS.USDCe, WHITELISTED_FAS.USDTe],
  },
  [WHITELISTED_CURVE_LP_COINS.USDCe_MOVE_VOLATILE.toString()]: {
    isStable: false,
    address: AccountAddress.from(
      '0x691877d4f5d4c1177d02f6ca3d399df4624af265533d305c008f6cb15d1567bc'
    ),
    name: 'USDCe-MOVE Volatile',
    fas: [WHITELISTED_FAS.USDCe, WHITELISTED_FAS.MOVE],
  },
  [WHITELISTED_CURVE_LP_COINS.USDTe_MOVE_VOLATILE.toString()]: {
    isStable: false,
    address: AccountAddress.from(
      '0x12061cb8e5a17ae7d34dd3371479f7cec323e4ad16b8991792fb496d739e87af'
    ),
    name: 'USDTe-MOVE Volatile',
    fas: [WHITELISTED_FAS.USDTe, WHITELISTED_FAS.MOVE],
  },
  [WHITELISTED_CURVE_LP_COINS.USDCe_WETHe_VOLATILE.toString()]: {
    isStable: false,
    address: AccountAddress.from(
      '0x110a99c29036cf12de428f55c6c1e1838578e3db6d17a0b3b4e6d2e101d124f1'
    ),
    name: 'USDCe-WETHe Volatile',
    fas: [WHITELISTED_FAS.USDCe, WHITELISTED_FAS.WETHe],
  },
  [WHITELISTED_CURVE_LP_COINS.WETHe_MOVE_VOLATILE.toString()]: {
    isStable: false,
    address: AccountAddress.from(
      '0x89d75aae2a4cc65660bd28d989582a69a3c1579ed32d965d346f21e5bf191330'
    ),
    name: 'WETHe-MOVE Volatile',
    fas: [WHITELISTED_FAS.WETHe, WHITELISTED_FAS.MOVE],
  },
};

export const FARMS = [
  {
    name: 'USDTe-MOVE TEST FARM',
    address: AccountAddress.from(
      '0xc7522bffe00b76d8a29d2a0290689868ca88d858c5923c725df23290500cc8c2'
    ),
    stakeFa: WHITELISTED_CURVE_LP_COINS.USDTe_MOVE_VOLATILE.toString(),
    rewards: [WHITELISTED_FAS.FIRE.toString()],
  },
];
