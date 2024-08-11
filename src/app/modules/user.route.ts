import { Router } from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateZodSchema from '../middlewares/validate-zod-schema';

const router = Router();

router.post(
  '/',
  validateZodSchema(UserValidation.createUserZodSchema),
  UserController.createUser,
);

export const UserRoutes = router;
