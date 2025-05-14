import { AccountAddress } from '@aptos-labs/ts-sdk';

export enum Network {
  MovementMainnet = 'movementMainnet',
  Bardock = 'bardock',
}

export const PACKAGES = {
  [Network.MovementMainnet]: {
    INTEREST_V3: {
      name: 'interest_v3',
      address: AccountAddress.from(
        '0x13418bb00810eca160f77aa03e134d6d62b0859653f9236ccc6293acf1a6513d'
      ),
    },
  },
  [Network.Bardock]: {
    INTEREST_V3: {
      name: 'interest_v3',
      address: AccountAddress.from(
        '0x13418bb00810eca160f77aa03e134d6d62b0859653f9236ccc6293acf1a6513d'
      ),
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
    MOVE: {
      type: '0x1::aptos_coin::AptosCoin',
      symbol: 'MOVE',
      name: 'Move Coin',
      iconUri: '',
      decimals: 8,
    },
  },
  [Network.Bardock]: {
    MOVE: {
      type: '0x1::aptos_coin::AptosCoin',
      symbol: 'MOVE',
      name: 'Move Coin',
      iconUri: '',
      decimals: 8,
    },
  },
};

export const FUNGIBLE_ASSETS = {
  [Network.MovementMainnet]: {
    [FA_ADDRESSES[Network.MovementMainnet].MOVE.toString()]: {
      symbol: 'MOVE',
      name: 'Move Coin',
      address: AccountAddress.from('0xa'),
      iconUri: '',
      decimals: 8,
    },
  },
  [Network.Bardock]: {
    [FA_ADDRESSES[Network.Bardock].MOVE.toString()]: {
      symbol: 'MOVE',
      name: 'Move Coin',
      address: AccountAddress.from(FA_ADDRESSES[Network.Bardock].MOVE),
      iconUri: '',
      decimals: 8,
    },
  },
} as const;

export const BRIDGE_FAS = {
  [Network.MovementMainnet]: [FA_ADDRESSES.movementMainnet.MOVE.toString()],
};

export const RESOURCE_TYPES = {
  [Network.MovementMainnet]: {
    FA_CONCURRENT_SUPPLY: '0x1::fungible_asset::ConcurrentSupply',
    FA_METADATA: '0x1::fungible_asset::Metadata',
    POOL: `${PACKAGES.movementMainnet.INTEREST_V3.address.toString()}::interest_v3_pool::InterestV3Pool`,
  },
  [Network.Bardock]: {
    FA_CONCURRENT_SUPPLY: '0x1::fungible_asset::ConcurrentSupply',
    FA_METADATA: '0x1::fungible_asset::Metadata',
    POOL: `${PACKAGES.bardock.INTEREST_V3.address.toString()}::interest_v3_pool::InterestV3Pool`,
  },
} as const;
