import { log, movementMainnetSDK } from './utils';

(async () => {
  const data = await movementMainnetSDK.getPoolPage({ start: 0, pageSize: 10 });

  log(data);
  log((data as any)[0].pools?.length);
})();
