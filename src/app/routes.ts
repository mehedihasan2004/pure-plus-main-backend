import { Router } from 'express';
import { UserRoutes } from './modules/user.route';

const router = Router();

[{ path: '/users', route: UserRoutes }].forEach(({ path, route }) =>
  router.use(path, route),
);

export const routes = router;
