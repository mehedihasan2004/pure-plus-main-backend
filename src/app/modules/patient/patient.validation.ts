import { z } from 'zod';
import { UserValidation } from '../user/user.validation';

const createAPatientZodSchema = z.object({
  address: z.string().optional(),
  emergencyContactNumber: z
    .string()
    .min(11, {
      message: 'Energency contact number should be at lest 11 character!',
    })
    .optional(),

  userId: z.string({ required_error: 'User id is required!' }),
});

const createAnUserWithPatientZodSchema = z.object({
  body: z.object({
    user: UserValidation.createAnUserZodSchema,
    patient: createAPatientZodSchema,
  }),
});

export const PatientValidation = { createAnUserWithPatientZodSchema };
