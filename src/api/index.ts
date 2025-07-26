import { Router } from 'express';
import routes from './router';

export default (): Router => {
  const app = Router();
  app.use('/api', routes());
  return app;
};
