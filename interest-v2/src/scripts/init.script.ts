import { InputGenerateTransactionPayloadData } from '@aptos-labs/ts-sdk';
import { PACKAGES, Network } from '../dex/constants';
import { log, processTx, movementMainnetClient } from './utils';

(async () => {
  const data: InputGenerateTransactionPayloadData = {
    function: `${PACKAGES[Network.MovementMainnet].INTEREST_V2.address.toString()}::interest_v2_entry::initialize`,
    functionArguments: [],
  };

  const transactionResponse = await processTx(data, movementMainnetClient);

  log(transactionResponse);
})();
