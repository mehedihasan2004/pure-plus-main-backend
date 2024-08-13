import { z } from 'zod';
import { EDepartment, ERank } from '@prisma/client';

const createADoctorZodSchema = z.object({
  body: z.object({
    department: z.enum(
      [...Object.values(EDepartment)] as [string, ...string[]],
      { required_error: 'Department is required!' },
    ),
    rank: z.enum([...Object.values(ERank)] as [string, ...string[]], {
      required_error: 'Rank is required!',
    }),
    qualifications: z
      .string({ required_error: 'Qualifications is required!' })
      .min(4, { message: 'Qualifications should be at least 4 character!' }),
    description: z
      .string()
      .min(10, { message: 'Description should be at least 10 character!' })
      .optional(),

    userId: z
      .string({ required_error: 'User id is required!' })
      .min(1, { message: 'User id should be at least 1 character!' }),
  }),
});

export const DoctorValidation = { createADoctorZodSchema };
