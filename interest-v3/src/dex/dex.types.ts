import { AccountAddress, Aptos } from '@aptos-labs/ts-sdk';

import { Network } from './constants';

export interface Package {
  name: string;
  address: AccountAddress;
}

export interface StructTag {
  name: string;
  module: string;
  address: string;
  typeParams: Array<string | StructTag>;
}

export interface ConstructorArgs {
  client?: Aptos;
  network?: Network;
}
