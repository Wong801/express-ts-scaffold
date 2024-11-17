import { Router, type Express } from 'express'
import userRoute from 'api/routes/user-route'
import ApiError from 'api/api-error';

export default ({ app }: { app: Express }) => {
  const router = Router()
  app.use('/api/v1/users', userRoute({ router }));

  // app.all('*', (req, res, next) => { next(new ApiError('Feature not found', 404)) })
};