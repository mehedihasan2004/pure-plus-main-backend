import { z } from 'zod';
import { EDepartment, ERank } from '@prisma/client';
import { UserValidation } from '../user/user.validation';

const createADoctorZodSchema = z.object({
  department: z.enum([...Object.values(EDepartment)] as [string, ...string[]], {
    required_error: 'Department is required!',
  }),
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
});

const createAUserAndDoctorZodSchema = z.object({
  body: z.object({
    user: UserValidation.createAnUserZodSchema,
    doctor: createADoctorZodSchema,
  }),
});

const updateADoctorZodSchema = z.object({
  department: z
    .enum([...Object.values(EDepartment)] as [string, ...string[]])
    .optional(),
  rank: z.enum([...Object.values(ERank)] as [string, ...string[]]).optional(),
  qualifications: z
    .string()
    .min(4, { message: 'Qualifications should be at least 4 character!' })
    .optional(),
  description: z
    .string()
    .min(10, { message: 'Description should be at least 10 character!' })
    .optional(),
});

const updateADoctorIncludingUserByUserIdZodSchema = z.object({
  body: z.object({
    user: UserValidation.updateAnUserFieldsZodSchema,
    doctor: updateADoctorZodSchema,
  }),
});

export const DoctorValidation = {
  createAUserAndDoctorZodSchema,
  updateADoctorIncludingUserByUserIdZodSchema,
};
