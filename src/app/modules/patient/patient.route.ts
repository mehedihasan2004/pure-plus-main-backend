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
  .get('/', PatientController.getAllPatients)
  .get('/:id', PatientController.getAPatientByUserId)

  // UPDATE
  .patch('/:id', PatientController.updateAPatientIncludingUserByUserId)

  // DELETE
  .delete('/:id', PatientController.deleteAPatientIncludingUserByUserId);

export const PatientRoutes = router;
