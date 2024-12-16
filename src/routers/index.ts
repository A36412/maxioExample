import { Application } from 'express';
import maxioRouter from './maxio.router';

export const registerRoutes = (app: Application): void => {
  app.use('/api/maxio', maxioRouter);
};