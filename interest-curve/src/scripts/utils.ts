import { Account, AccountAddress, Ed25519PrivateKey } from '@aptos-labs/ts-sdk';
import dotenv from 'dotenv';
import invariant from 'tiny-invariant';
import util from 'util';

import {
  FUNGIBLE_ASSETS,
  getDefaultClient,
  InterestCurve,
  Network,
} from '../dex';

dotenv.config();

invariant(process.env.KEY, 'Private key missing');

const privateKey = new Ed25519PrivateKey(process.env.KEY);
export const account = Account.fromPrivateKey({ privateKey });

export const bardockClient = getDefaultClient(Network.Bardock);

export const bardockSDK = new InterestCurve({
  network: Network.Bardock,
  client: bardockClient,
});

export const movementMainnetSDK = new InterestCurve({
  network: Network.MovementMainnet,
});

export const movementMainnetClient = getDefaultClient(Network.MovementMainnet);

export const COINS = {
  [Network.MovementMainnet]: {
    MOVE: '0x1::aptos_coin::AptosCoin',
  },
  [Network.Bardock]: {
    MOVE: '0x1::aptos_coin::AptosCoin',
  },
};

export const FA_ADDRESSES = {
  [Network.MovementMainnet]: {
    MOVE: AccountAddress.from('0xa'),
    TEST: AccountAddress.from(
      '0xa9e24310872baa7625891b9aa7e698d3140fef5faaa933b65c3ff8216a364598'
    ),
    TEST123: AccountAddress.from(
      '0xa8ba601f7af42c34d2cd2feee9d41e62160dcd77dd07a9e2308dff07b2a258e1'
    ),
    USDCe: AccountAddress.from(
      '0x83121c9f9b0527d1f056e21a950d6bf3b9e9e2e8353d0e95ccea726713cbea39'
    ),
    USDTe: AccountAddress.from(
      '0x447721a30109c662dde9c73a0c2c9c9c459fb5e5a9c92f03c50fa69737f5d08d'
    ),
  },
  [Network.Bardock]: {
    MOVE: AccountAddress.from('0xa'),
    TEST: AccountAddress.from(
      '0xa9e24310872baa7625891b9aa7e698d3140fef5faaa933b65c3ff8216a364598'
    ),
  },
} as const;

export const log = (x: any) => console.log(util.inspect(x, { depth: null }));

export const STRICT_POOLS = {
  [Network.MovementMainnet]: [
    {
      isStable: false,
      address: AccountAddress.from(
        '0x486cc5aacea27797e8f47971ac5b0bc301d1aafd9b5510811360a7d28768ad39'
      ),
      name: 'USDCe-MOVE',
      fas: [
        FUNGIBLE_ASSETS[Network.MovementMainnet][
          FA_ADDRESSES[Network.MovementMainnet].USDCe.toString()
        ],
        FUNGIBLE_ASSETS[Network.MovementMainnet][
          FA_ADDRESSES[Network.MovementMainnet].MOVE.toString()
        ],
      ],
    },
    {
      isStable: false,
      address: AccountAddress.from(
        '0x486cc5aacea27797e8f47971ac5b0bc301d1aafd9b5510811360a7d28768ad39'
      ),
      name: 'MOVE-TEST123',
      fas: [
        FUNGIBLE_ASSETS[Network.MovementMainnet][
          FA_ADDRESSES[Network.MovementMainnet].MOVE.toString()
        ],
        FUNGIBLE_ASSETS[Network.MovementMainnet][
          FA_ADDRESSES[Network.MovementMainnet].TEST123.toString()
        ],
      ],
    },
  ],
  [Network.Bardock]: [
    {
      isStable: false,
      address: AccountAddress.from(
        '0x61a089010e51980eb9716983ef9e6905ad0cb7733612f59da091dd27efa75f9e'
      ),
      name: 'MOVE-TEST',
      fas: [
        FUNGIBLE_ASSETS[Network.Bardock][
          FA_ADDRESSES[Network.Bardock].MOVE.toString()
        ],
        FUNGIBLE_ASSETS[Network.Bardock][
          FA_ADDRESSES[Network.Bardock].TEST.toString()
        ],
      ],
    },
  ],
};
