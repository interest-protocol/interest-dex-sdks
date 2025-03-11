import { AccountAddress } from '@aptos-labs/ts-sdk';

export enum Network {
  MovementMainnet = 'movementMainnet',
  Bardock = 'bardock',
}

export const PACKAGES = {
  [Network.MovementMainnet]: {
    INTEREST_V2: {
      name: 'interest_v2',
      address: AccountAddress.from(
        '0x13418bb00810eca160f77aa03e134d6d62b0859653f9236ccc6293acf1a6513d'
      ),
    },
    UTILS: {
      name: 'utils',
      address: AccountAddress.from(
        '0xdb1920f8c6742362ce3929fc63fb6c45adefd8228e732e25f9ec6debf1c3be8d'
      ),
    },
  },
  [Network.Bardock]: {
    INTEREST_V2: {
      name: 'interest_v2',
      address: AccountAddress.from(
        '0x13418bb00810eca160f77aa03e134d6d62b0859653f9236ccc6293acf1a6513d'
      ),
    },
    UTILS: {
      name: 'utils',
      address: AccountAddress.from(
        '0xdb1920f8c6742362ce3929fc63fb6c45adefd8228e732e25f9ec6debf1c3be8d'
      ),
    },
  },
} as const;

export const FA_ADDRESSES = {
  [Network.MovementMainnet]: {
    MOVE: AccountAddress.from('0xa'),
    FIRE_EMOJI: AccountAddress.from(
      '0x5f7f59e38a96dfe79830f53fe49a19e770f70a13ff30ce598a49e8f0a2b46861'
    ),
  },
  [Network.Bardock]: {
    MOVE: AccountAddress.from('0xa'),
    MEME: AccountAddress.from(
      '0xd78fadd4cd564130f54b64f72c5e48a2f7f0b7c1824324a31e635feb2c210bde'
    ),
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
    [FA_ADDRESSES[Network.MovementMainnet].FIRE_EMOJI.toString()]: {
      symbol: '🔥',
      name: '🔥',
      address: AccountAddress.from(
        FA_ADDRESSES[Network.MovementMainnet].FIRE_EMOJI
      ),
      iconUri:
        'https://interestprotocol.infura-ipfs.io/ipfs/QmZG3Mnc9QvwUbpweS3TtX8iLsYYyxGkXQEocpmh7MjpcX',
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
    [FA_ADDRESSES[Network.Bardock].MEME.toString()]: {
      symbol: 'MEME',
      name: 'Meme Coin',
      address: AccountAddress.from(FA_ADDRESSES[Network.Bardock].MEME),
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
    CONFIG: `${PACKAGES.movementMainnet.INTEREST_V2.address.toString()}::config::Config`,
    FA_CONCURRENT_SUPPLY: '0x1::fungible_asset::ConcurrentSupply',
    FA_METADATA: '0x1::fungible_asset::Metadata',
    POOL: `${PACKAGES.movementMainnet.INTEREST_V2.address.toString()}::interest_v2_pool::InterestV2Pool`,
  },
  [Network.Bardock]: {
    CONFIG: `${PACKAGES.bardock.INTEREST_V2.address.toString()}::config::Config`,
    FA_CONCURRENT_SUPPLY: '0x1::fungible_asset::ConcurrentSupply',
    FA_METADATA: '0x1::fungible_asset::Metadata',
    POOL: `${PACKAGES.bardock.INTEREST_V2.address.toString()}::interest_v2_pool::InterestV2Pool`,
  },
} as const;
