import { Router } from 'express';
import { DoctorController } from './doctor.controller';
import { DoctorValidation } from './doctor.validation';
import validateZodSchema from '../../middlewares/validate-zod-schema';

const router = Router();

router

  // WRITE
  .post(
    '/',
    validateZodSchema(DoctorValidation.createAUserAndDoctorZodSchema),
    DoctorController.createADoctor,
  )

  // READ
  .get('/', DoctorController.getAllDoctors)
  .get('/:id', DoctorController.getADoctorByUserId)

  // UPDATE
  .patch(
    '/:id',
    validateZodSchema(
      DoctorValidation.updateADoctorIncludingUserByUserIdZodSchema,
    ),
    DoctorController.updateADoctorIncludingUserByUserId,
  )

  // DELETE
  .delete('/:id', DoctorController.deleteADoctorIncludingUserByUserId);

export const DoctorRoutes = router;
