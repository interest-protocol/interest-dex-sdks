import {
  AccountAddress,
  Aptos,
  AptosConfig,
  MoveResource,
  Network as AptosNetwork,
} from '@aptos-labs/ts-sdk';
import { pathOr, propOr } from 'ramda';

import { DEFAULT_VOLATILE_POOL, Network, TYPES } from './constants';
import {
  CoinBalance,
  ConstructorArgs,
  FaMetadata,
  FaPayload,
  FaSupply,
  InterestCurvePool,
  MoveResourceType,
} from './dex.types';
import {
  findConcurrentSupply,
  findFaMetadata,
  findObjectCore,
  findPairedCoinType,
} from './getters';
import { addAllVolatileState } from './volatile-utils';

const MOVEMENT_MAINNET_RPC_URL = 'https://mainnet.movementnetwork.xyz/v1';
const MOVEMENT_MAINNET_INDEXER_URL =
  'https://indexer.mainnet.movementnetwork.xyz/v1/graphql';

const MOVEMENT_BARDOCK_RPC_URL =
  'https://aptos.testnet.bardock.movementlabs.xyz/v1';

const MOVEMENT_BARDOCK_INDEXER_URL =
  'https://indexer.testnet.movementnetwork.xyz';

export const movementMainnetClient = new Aptos(
  new AptosConfig({
    fullnode: MOVEMENT_MAINNET_RPC_URL,
    network: AptosNetwork.CUSTOM,
    indexer: MOVEMENT_MAINNET_INDEXER_URL,
  })
);

export const bardockClient = new Aptos(
  new AptosConfig({
    fullnode: MOVEMENT_BARDOCK_RPC_URL,
    network: AptosNetwork.CUSTOM,
    indexer: MOVEMENT_BARDOCK_INDEXER_URL,
  })
);
export const aptosMainnetClient = new Aptos(
  new AptosConfig({ network: AptosNetwork.MAINNET })
);

export const aptosTestnetClient = new Aptos(
  new AptosConfig({ network: AptosNetwork.TESTNET })
);

export const getDefaultClient = (network: Network): Aptos => {
  if (network === Network.Bardock) return bardockClient;

  return movementMainnetClient;
};

export const getDefaultConstructorArgs = (): ConstructorArgs => {
  return {
    client: movementMainnetClient,
    network: Network.MovementMainnet,
  };
};

export const NEW_STABLE_POOL_COIN_FUNCTION_NAME = {
  2: 'new_stable_2_coin_pool',
  3: 'new_stable_3_coin_pool',
  4: 'new_stable_4_coin_pool',
  5: 'new_stable_5_coin_pool',
  6: 'new_stable_6_coin_pool',
} as Record<number, string>;

export const NEW_VOLATILE_POOL_COIN_FUNCTION_NAME = {
  2: 'new_volatile_2_coin_pool',
  3: 'new_volatile_3_coin_pool',
  4: 'new_volatile_4_coin_pool',
  5: 'new_volatile_5_coin_pool',
  6: 'new_volatile_6_coin_pool',
} as Record<number, string>;

export function hex2a(hexx: string) {
  const hex = hexx.toString(); //force conversion
  let str = '';
  for (let i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

const moveResourceTypeToStructTag = (resource: MoveResourceType) =>
  `${resource.account_address}::${hex2a(resource.module_name.slice(2))}::${hex2a(resource.struct_name.slice(2))}`;

const makeFaSupply = (resources: MoveResource[]): FaSupply => {
  const concurrentSupplyData = findConcurrentSupply(resources);

  const concurrentSupply = pathOr(
    null,
    ['data', 'current'],
    concurrentSupplyData
  ) as Record<string, string> | null;

  const supply = {
    maxValue: BigInt(propOr(0, 'max_value', concurrentSupply)),
    value: BigInt(propOr(0, 'value', concurrentSupply)),
  };

  return supply;
};

export const toFaMetadata = (resources: MoveResource[]): FaMetadata => {
  const faMetadataData = findFaMetadata(resources);

  return {
    decimals: pathOr(0, ['data', 'decimals'], faMetadataData),
    iconURI: pathOr('', ['data', 'icon_uri'], faMetadataData),
    name: pathOr('', ['data', 'name'], faMetadataData),
    projectURI: pathOr('', ['data', 'project_uri'], faMetadataData),
    symbol: pathOr('', ['data', 'symbol'], faMetadataData),
  };
};

export const toFaPayload = (resources: MoveResource[]): FaPayload => {
  const pairedCoinTypeResource = findPairedCoinType(resources);

  const pairedCoinTypeData = pathOr(
    null,
    ['data', 'type'],
    pairedCoinTypeResource
  ) as MoveResourceType | null;

  const objectCoreData = findObjectCore(resources);

  return {
    pairedCoinType: pairedCoinTypeData
      ? moveResourceTypeToStructTag(pairedCoinTypeData)
      : null,
    metadata: toFaMetadata(resources),
    address: AccountAddress.from(
      pathOr(
        '0x0',
        ['data', 'transfer_events', 'guid', 'id', 'addr'],
        objectCoreData
      )
    ),
    supply: makeFaSupply(resources),
    allowsUngatedTransfer: pathOr(
      false,
      ['data', 'allow_ungated_transfer'],
      objectCoreData
    ),
    owner: AccountAddress.from(
      pathOr('0x0', ['data', 'owner'], objectCoreData)
    ),
  };
};

export const toInterestPool = (
  pool: string,
  resources: MoveResource[],
  network: Network
): InterestCurvePool => {
  const data = resources.reduce((acc, resource) => {
    return addAllVolatileState(acc, resource, network);
  }, DEFAULT_VOLATILE_POOL as InterestCurvePool);

  return {
    ...data,
    address: pool,
  };
};

export const getCoinTypeFromCoinStoreType = (coinStoreType: string) =>
  coinStoreType.split('<')[1].split('>')[0];

export const getAddressCoinBalances = async (
  account: string,
  client: Aptos
): Promise<CoinBalance[]> => {
  const data = await client.getAccountResources({
    accountAddress: AccountAddress.from(account),
  });

  return data
    .filter((resource) =>
      resource.type.startsWith(TYPES.movementMainnet.COIN_STORE)
    )
    .map((resource) => ({
      type: getCoinTypeFromCoinStoreType(resource.type),
      balance: BigInt(pathOr(0, ['data', 'coin', 'value'], resource)),
    }));
};
