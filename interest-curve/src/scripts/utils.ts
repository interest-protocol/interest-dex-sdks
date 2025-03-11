import { Account, AccountAddress, Ed25519PrivateKey } from '@aptos-labs/ts-sdk';
import dotenv from 'dotenv';
import invariant from 'tiny-invariant';
import util from 'util';

import {
  FA_ADDRESSES,
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

export const log = (x: any) => console.log(util.inspect(x, { depth: null }));

export const STRICT_POOLS = {
  [Network.MovementMainnet]: [
    {
      isStable: false,
      address: AccountAddress.from(
        '0xdfa2be63f0a812001c537a9dd283b76bb31138846a9129bd39855979f04ab87b'
      ),
      name: 'MOVE-TEST',
      fas: [
        FUNGIBLE_ASSETS[Network.MovementMainnet][
          FA_ADDRESSES[Network.MovementMainnet].MOVE.toString()
        ],
        FUNGIBLE_ASSETS[Network.MovementMainnet][
          FA_ADDRESSES[Network.MovementMainnet].TEST.toString()
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
