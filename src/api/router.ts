import { Router } from 'express';
import { createFarmer, createFarm, registerBots, getExploreTab, getMyFarmTab, getAlertsTab } from './controller';

export default (): Router => {
  const app = Router();
  app.post('/farmer', createFarmer);
  app.post('/farm', createFarm);
  app.post('/bandhu', registerBots);
  app.get('/explore', getExploreTab);
  app.get('/myfarm', getMyFarmTab)
  app.get('/alerts', getAlertsTab)
  return app;
};
