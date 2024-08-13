import { Router } from 'express';
import { DoctorController } from './doctor.controller';
import { DoctorValidation } from './doctor.validation';
import validateZodSchema from '../../middlewares/validate-zod-schema';

const router = Router();

router

  // WRITE
  .post(
    '/',
    validateZodSchema(DoctorValidation.createADoctorZodSchema),
    DoctorController.createADoctor,
  );

export const DoctorRoutes = router;
