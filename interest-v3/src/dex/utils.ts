import {
  Aptos,
  AptosConfig,
  Network as AptosNetwork,
} from '@aptos-labs/ts-sdk';

import { Network } from './constants';
import { splitGenericParameters } from '@mysten/bcs';
import { ConstructorArgs, StructTag } from './dex.types';

const MOVEMENT_BARDOCK_RPC_URL =
  'https://aptos.testnet.bardock.movementlabs.xyz/v1';

const MOVEMENT_BARDOCK_INDEXER_URL =
  'https://indexer.testnet.movementnetwork.xyz';

export const MOVEMENT_MAINNET_RPC_URL =
  'https://mainnet.movementnetwork.xyz/v1';

export const MOVEMENT_MAINNET_INDEXER_URL =
  'https://indexer.mainnet.movementnetwork.xyz/v1/graphql';

export const BLOCK_PI_MAINNET_RPC_URL =
  'https://movement.blockpi.network/rpc/v1/public/v1';

export const SENTIO_MAINNET_RPC_URL = 'https://rpc.sentio.xyz/movement/v1';

export function hexToUtf8(hexString: string) {
  // Remove the '0x' prefix if present
  if (hexString.startsWith('0x')) {
    hexString = hexString.slice(2);
  }

  // Convert hex to Uint8Array
  const bytes = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < hexString.length; i += 2) {
    bytes[i / 2] = parseInt(hexString.slice(i, i + 2), 16);
  }

  // Convert Uint8Array to UTF-8 string
  return new TextDecoder('utf-8').decode(bytes);
}

const bardockClient = new Aptos(
  new AptosConfig({
    fullnode: MOVEMENT_BARDOCK_RPC_URL,
    network: AptosNetwork.CUSTOM,
    indexer: MOVEMENT_BARDOCK_INDEXER_URL,
  })
);

const movementMainnetClient = new Aptos(
  new AptosConfig({
    fullnode: MOVEMENT_MAINNET_RPC_URL,
    network: AptosNetwork.CUSTOM,
    indexer: MOVEMENT_MAINNET_INDEXER_URL,
  })
);

export const getDefaultClient = (network: Network): Aptos => {
  if (network === Network.MovementMainnet) return movementMainnetClient;
  if (network === Network.Bardock) return bardockClient;
  return movementMainnetClient;
};

export const getDefaultConstructorArgs = (): ConstructorArgs => {
  return {
    client: movementMainnetClient,
    network: Network.MovementMainnet,
  };
};

export function normalizeAddress(
  value: string,
  forceAdd0x: boolean = false
): string {
  let address = value.toLowerCase();
  if (!forceAdd0x && address.startsWith('0x')) {
    address = address.slice(2);
  }
  return `0x${address.padStart(32 * 2, '0')}`;
}

export function parseStructTag(type: string): StructTag {
  const [address, module] = type.split('::');

  const rest = type.slice(address.length + module.length + 4);
  const name = rest.includes('<') ? rest.slice(0, rest.indexOf('<')) : rest;
  const typeParams = rest.includes('<')
    ? splitGenericParameters(
        rest.slice(rest.indexOf('<') + 1, rest.lastIndexOf('>'))
      ).map((typeParam) => parseTypeTag(typeParam.trim()))
    : [];

  return {
    address: normalizeAddress(address),
    module,
    name,
    typeParams,
  };
}

export function normalizeStructTag(type: string | StructTag): string {
  const { address, module, name, typeParams } =
    typeof type === 'string' ? parseStructTag(type) : type;

  const formattedTypeParams =
    typeParams?.length > 0
      ? `<${typeParams
          .map((typeParam) =>
            typeof typeParam === 'string'
              ? typeParam
              : normalizeStructTag(typeParam)
          )
          .join(',')}>`
      : '';

  return `${address}::${module}::${name}${formattedTypeParams}`;
}

function parseTypeTag(type: string): string | StructTag {
  if (!type.includes('::')) return type;

  return parseStructTag(type);
}
