import { Router } from 'express';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import validateZodSchema from '../../middlewares/validate-zod-schema';

const router = Router();

router

  // WRITE
  .post(
    '/',
    validateZodSchema(UserValidation.createUserZodSchema),
    UserController.createUser,
  )

  // READ
  .get('/', UserController.getAllUsers)
  .get('/:id', UserController.getAUserById)

  // DELETE
  .delete('/:id', UserController.deleteAUserById);

export const UserRoutes = router;
