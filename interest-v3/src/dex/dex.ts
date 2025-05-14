import { Aptos } from '@aptos-labs/ts-sdk';

import invariant from 'tiny-invariant';

import { ConstructorArgs, Package } from './dex.types';
import { PACKAGES, Network } from './constants';
import { getDefaultConstructorArgs } from './utils';

export class InterestV3 {
  // Network
  #client: Aptos;
  #network: Network;

  // Packages
  #package: Package;

  // Modules
  #routerModule = 'interest_v3_router';
  #poolModule = 'interest_v3_pool';
  #quoterModule = 'interest_v3_quoter';
  #lensModule = 'interest_v3_lens';

  // Constants
  FEE_PRECISION = 1_000_000;

  MIN_TICK = -443636;
  MAX_TICK = 443636;
  MAX_TICK_SPACING = 16_384;

  MIN_SQRT_PRICE_X64 = 4295048016;
  MAX_SQRT_PRICE_X64 = 79226673515401279992447579061;

  Q64 = 0x10000000000000000;
  Q64_RESOLUTION = 64;

  constructor(args: ConstructorArgs | undefined | null = null) {
    const data = {
      ...getDefaultConstructorArgs(),
      ...args,
    };

    invariant(data.client, 'Client is required');
    invariant(data.network, 'Network is required');
    invariant(PACKAGES[data.network], 'Invalid network');

    this.#client = data.client;
    this.#package = PACKAGES[data.network].INTEREST_V3;
    this.#network = data.network;
  }
}
