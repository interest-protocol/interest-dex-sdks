import { log, movementMainnetSDK } from './utils';

(async () => {
  const data = await movementMainnetSDK.get_pools_simple_info({
    start: 0,
    pageSize: 10,
  });

  log(data);
  log((data as any)[0].length);
})();
