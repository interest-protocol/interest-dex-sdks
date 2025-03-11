import { movementMainnetSDK, log } from './utils';

(async () => {
  const data = await movementMainnetSDK.getPoolPage({
    pageSize: 50,
    start: 0,
  });

  log(data);
  log(data?.pools.length);
})();
