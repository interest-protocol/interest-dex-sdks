import { movementMainnetSDK, log } from './utils';

(async () => {
  const data = await movementMainnetSDK.getConfig();

  log(data);
  log(data.admin.toString());
})();
