import { Router } from 'express';
import { AppointmentController } from './appointment.controller';
import { AppointmentValidation } from './appointment.validation';
import validateZodSchema from '../../middlewares/validate-zod-schema';

const router = Router();

router

  // WRITE
  .post(
    '/',
    validateZodSchema(AppointmentValidation.createAnAppointmentZodSchema),
    AppointmentController.createAnAppointment,
  )

  // READ
  .get('/', AppointmentController.getAllAppointments);

export const AppointmentRoutes = router;
