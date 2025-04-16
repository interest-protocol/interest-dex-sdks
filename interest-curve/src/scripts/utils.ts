import { Account, AccountAddress, Ed25519PrivateKey } from '@aptos-labs/ts-sdk';
import dotenv from 'dotenv';
import invariant from 'tiny-invariant';
import util from 'util';

import {
  getDefaultClient,
  InterestCurve,
  Network,
  WHITELISTED_FAS,
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

export const TEST_MAINNET_FA_ADDRESSES = {
  TEST: AccountAddress.from(
    '0xa9e24310872baa7625891b9aa7e698d3140fef5faaa933b65c3ff8216a364598'
  ),
  TEST123: AccountAddress.from(
    '0xa8ba601f7af42c34d2cd2feee9d41e62160dcd77dd07a9e2308dff07b2a258e1'
  ),
};

export const FA_ADDRESSES = {
  [Network.MovementMainnet]: {
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
  },
  [Network.Bardock]: {
    MOVE: AccountAddress.from('0xa'),
    TEST: AccountAddress.from(
      '0xa9e24310872baa7625891b9aa7e698d3140fef5faaa933b65c3ff8216a364598'
    ),
  },
} as const;

export const log = (x: any) => console.log(util.inspect(x, { depth: null }));

export const TEST_MAINNET_TEST_POOLS = {
  [Network.MovementMainnet]: [
    {
      isStable: false,
      address: AccountAddress.from(
        '0x486cc5aacea27797e8f47971ac5b0bc301d1aafd9b5510811360a7d28768ad39'
      ),
      name: 'MOVE-TEST123',
      fas: [WHITELISTED_FAS.MOVE, TEST_MAINNET_FA_ADDRESSES.TEST],
    },
  ],
};
