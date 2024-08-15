import { z } from 'zod';
import {
  EDepartment,
  EPaymentStatus,
  EAppointmentStatus,
  EAppointmentTimeSlot,
} from '@prisma/client';

const createAnAppointmentZodSchema = z.object({
  body: z.object({
    department: z.enum(
      [...Object.values(EDepartment)] as [string, ...string[]],
      { required_error: 'Department is required!' },
    ),
    date: z.string({ required_error: 'Date is required!' }),
    timeSlot: z.enum(
      [...Object.values(EAppointmentTimeSlot)] as [string, ...string[]],
      { required_error: 'Time slot is required!' },
    ),
    status: z
      .enum([...Object.values(EAppointmentStatus)] as [string, ...string[]])
      .default(EAppointmentStatus.SCHEDULED),
    paymentStatus: z
      .enum([...Object.values(EPaymentStatus)] as [string, ...string[]])
      .default(EPaymentStatus.NOT_PAID),
    prescription: z.string().optional(),
    followUpDate: z.string().optional(),

    doctorId: z.string({ required_error: 'Doctor id is required!' }),
    patientId: z.string({ required_error: 'Patient id is required!' }),
  }),
});

export const AppointmentValidation = { createAnAppointmentZodSchema };
