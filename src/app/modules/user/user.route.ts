import { Router } from 'express';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import validateZodSchema from '../../middlewares/validate-zod-schema';

const router = Router();

router

  // READ
  .get('/', UserController.getAllUsers)
  .get('/:id', UserController.getAnUserById)

  // UPDATE
  .patch(
    '/:id',
    validateZodSchema(UserValidation.updateAnUserZodSchema),
    UserController.updateAnUserById,
  )

  // DELETE
  .delete('/:id', UserController.deleteAnUserById);

export const UserRoutes = router;
