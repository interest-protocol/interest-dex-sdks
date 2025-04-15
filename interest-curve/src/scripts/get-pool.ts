import { log, movementMainnetSDK } from './utils';

(async () => {
  const data = await movementMainnetSDK.getPool(
    '0x691877d4f5d4c1177d02f6ca3d399df4624af265533d305c008f6cb15d1567bc'
  );

  log(data);
})();
