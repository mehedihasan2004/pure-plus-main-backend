import { Router } from 'express';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import validateZodSchema from '../../middlewares/validate-zod-schema';

const router = Router();

router

  // READ
  .get('/', UserController.getAllUsers)
  .get('/:id', UserController.getAUserById)

  // UPDATE
  .patch(
    '/:id',
    validateZodSchema(UserValidation.updateUserZodSchema),
    UserController.updateAUserById,
  )

  // DELETE
  .delete('/:id', UserController.deleteAUserById);

export const UserRoutes = router;
