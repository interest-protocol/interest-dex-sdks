import {
  Account,
  Ed25519PrivateKey,
  InputGenerateTransactionPayloadData,
} from '@aptos-labs/ts-sdk';
import dotenv from 'dotenv';
import invariant from 'tiny-invariant';
import util from 'util';

import { getDefaultClient, InterestV3, Network } from '../dex';

dotenv.config();

invariant(process.env.KEY, 'Private key missing');

export const POW_8 = 10n ** 8n;

const privateKey = new Ed25519PrivateKey(process.env.KEY);
export const account = Account.fromPrivateKey({ privateKey });

export const bardockClient = getDefaultClient(Network.Bardock);

export const movementMainnetClient = getDefaultClient(Network.MovementMainnet);

export const bardockSDK = new InterestV3({
  network: Network.Bardock,
  client: bardockClient,
});

export const movementMainnetSDK = new InterestV3({
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
  [Network.MovementMainnet]: {},
  [Network.Bardock]: {},
};
