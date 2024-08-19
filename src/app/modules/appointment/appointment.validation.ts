import { z } from 'zod';
import {
  EDepartment,
  EPaymentStatus,
  EAppointmentStatus,
  EAppointmentTimeSlot,
} from '@prisma/client';

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

const updateAnAppointmentByIdZodSchema = z.object({
  body: z.object({
    department: z
      .enum([...Object.values(EDepartment)] as [string, ...string[]])
      .optional(),
    date: z.string().optional(),
    timeSlot: z
      .enum([...Object.values(EAppointmentTimeSlot)] as [string, ...string[]])
      .optional(),
    status: z
      .enum([...Object.values(EAppointmentStatus)] as [string, ...string[]])
      .optional(),
    paymentStatus: z
      .enum([...Object.values(EPaymentStatus)] as [string, ...string[]])
      .optional(),
    prescription: z.string().optional(),
    followUpDate: z.string().optional(),

    doctorId: z.string().optional(),
    patientId: z.string().optional(),
  }),
});

export const AppointmentValidation = {
  createAnAppointmentZodSchema,
  updateAnAppointmentByIdZodSchema,
};
