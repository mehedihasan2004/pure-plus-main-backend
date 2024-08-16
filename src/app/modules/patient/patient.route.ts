import { Router } from 'express';
import { PatientValidation } from './patient.validation';
import { PatientController } from './patient.controller';
import validateZodSchema from '../../middlewares/validate-zod-schema';

const router = Router();

router

  // WRITE
  .post(
    '/',
    validateZodSchema(PatientValidation.createAnUserWithPatientZodSchema),
    PatientController.createAnUserWithPatient,
  )

  // READ
  .get('/:id', PatientController.getAPatientByUserId);

export const PatientRoutes = router;
