import { z } from 'zod';
import { EAppointmentTimeSlot } from '@prisma/client';

const createAnAppointmentZodSchema = z.object({
  body: z.object({
    date: z.string({ required_error: 'Date is required!' }),
    timeSlot: z.enum(
      [...Object.values(EAppointmentTimeSlot)] as [string, ...string[]],
      { required_error: 'Time slot is required!' },
    ),

    doctorId: z.string({ required_error: 'Doctor id is required!' }),
    patientId: z.string({ required_error: 'Patient id is required!' }),
  }),
});

export const AppointmentValidation = { createAnAppointmentZodSchema };
