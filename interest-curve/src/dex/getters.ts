import { MoveResource } from '@aptos-labs/ts-sdk';

import { Network, TYPES } from './constants';

export const findPairedCoinType = (resources: MoveResource[]) =>
  resources.find(
    (resource) =>
      resource.type === TYPES[Network.MovementMainnet].PAIRED_COIN_TYPE
  ) || null;

export const findConcurrentSupply = (resources: MoveResource[]) =>
  resources.find(
    (resource) =>
      resource.type === TYPES[Network.MovementMainnet].CONCURRENT_SUPPLY
  ) || null;

export const findFaMetadata = (resources: MoveResource[]) =>
  resources.find(
    (resource) => resource.type === TYPES[Network.MovementMainnet].FA_METADATA
  ) || null;

export const findObjectCore = (resources: MoveResource[]) =>
  resources.find(
    (resource) => resource.type === TYPES[Network.MovementMainnet].OBJECT_CORE
  ) || null;
