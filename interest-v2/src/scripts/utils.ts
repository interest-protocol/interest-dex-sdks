import {
  Account,
  Ed25519PrivateKey,
  AccountAddress,
  InputGenerateTransactionPayloadData,
} from '@aptos-labs/ts-sdk';
import dotenv from 'dotenv';
import invariant from 'tiny-invariant';
import util from 'util';

import { getDefaultClient, Network, InterestV2, FA_ADDRESSES } from '../dex';

dotenv.config();

invariant(process.env.KEY, 'Private key missing');

export const POW_8 = 10n ** 8n;

const privateKey = new Ed25519PrivateKey(process.env.KEY);
export const account = Account.fromPrivateKey({ privateKey });

export const bardockClient = getDefaultClient(Network.Bardock);

export const movementMainnetClient = getDefaultClient(Network.MovementMainnet);

export const bardockSDK = new InterestV2({
  network: Network.Bardock,
  client: bardockClient,
});

export const movementMainnetSDK = new InterestV2({
  network: Network.MovementMainnet,
  client: movementMainnetClient,
});

export const COINS = {
  [Network.Bardock]: {
    MOVE: '0x1::aptos_coin::AptosCoin',
  },
  [Network.MovementMainnet]: {
    MOVE: '0x1::aptos_coin::AptosCoin',
  },
};

export const log = (x: any) => console.log(util.inspect(x, { depth: null }));

export const processTx = async (
  data: InputGenerateTransactionPayloadData,
  client = movementMainnetClient
) => {
  const transaction = await client.transaction.build.simple({
    sender: account.accountAddress,
    data,
  });

  const senderAuthenticator = await client.sign({
    signer: account,
    transaction,
  });

  const submittedTx = await client.transaction.submit.simple({
    transaction,
    senderAuthenticator,
  });

  return client.waitForTransaction({
    transactionHash: submittedTx.hash,
  });
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const POOLS = {
  [Network.MovementMainnet]: {
    '0x4487140c34467abd4bde7d635046c529d01dcdaa47d7550466f3a85afe946dc1': {
      decimals: 8,
      address: AccountAddress.from(
        '0x4487140c34467abd4bde7d635046c529d01dcdaa47d7550466f3a85afe946dc1'
      ),
      iconUri: '',
      name: 'v2-MOVE/🔥',
      projectUri: 'https://www.interest.xyz',
      symbol: 'v2-LpFa',
      faX: AccountAddress.from(FA_ADDRESSES.movementMainnet.MOVE),
      faY: AccountAddress.from(FA_ADDRESSES.movementMainnet.FIRE_EMOJI),
    },
  },
  [Network.Bardock]: {
    '0x365438c1666d336d7899ab1bf9bfe52024c80a32eef5a32d1e14838efb20aee9': {
      decimals: 8,
      address: AccountAddress.from(
        '0x365438c1666d336d7899ab1bf9bfe52024c80a32eef5a32d1e14838efb20aee9'
      ),
      iconUri: '',
      name: 'v2-MOVE/MEME',
      projectUri: 'https://www.interest.xyz',
      symbol: 'v2-LpFa',
      faX: AccountAddress.from(FA_ADDRESSES.bardock.MOVE),
      faY: AccountAddress.from(FA_ADDRESSES.bardock.MEME),
    },
  },
};
