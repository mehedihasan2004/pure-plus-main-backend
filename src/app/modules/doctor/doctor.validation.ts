import { z } from 'zod';
import { UserValidation } from '../user/user.validation';
import { EDepartment, EGender, ERank, ERole } from '@prisma/client';

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

const updateAUserZodSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  gender: z
    .enum([...Object.values(EGender)] as [string, ...string[]])
    .optional(),
  image: z.string().optional(),
  role: z.enum([...Object.values(ERole)] as [string, ...string[]]).optional(),
  dateofBirth: z.string().optional(),
});

const updateADoctorIncludingUserByUserIdZodSchema = z.object({
  body: z.object({
    user: updateAUserZodSchema,
    doctor: updateADoctorZodSchema,
  }),
});

export const DoctorValidation = {
  createAUserAndDoctorZodSchema,
  updateADoctorIncludingUserByUserIdZodSchema,
};
