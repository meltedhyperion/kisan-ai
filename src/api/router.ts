import { Router } from 'express';
import { createFarmer, createFarm, registerBots, getExploreTab, getMyFarmTab, getAlertsTab, geminicall } from './controller';

export default (): Router => {
  const app = Router();
  app.post('/farmer', createFarmer);
  app.post('/farm', createFarm);

  app.post('/bandhu', registerBots);
  app.get('/myfarm', getMyFarmTab);

  // comes from hardware sensors and external info sources
  app.get('/explore', getExploreTab);
  app.get('/alerts', getAlertsTab);

  app.get('/converse', geminicall);
  return app;
};
