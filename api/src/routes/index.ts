import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import { routes } from '../libs/profile';

const router = Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.use('/data', (_, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);

router.use('/profile', routes);

export default router;
