import { z } from 'zod';
import { EGender, ERole } from '@prisma/client';

const createAnUserZodSchema = z.object({
  id: z
    .string({ required_error: 'Id is required!' })
    .min(1, { message: 'Id should be at least one character!' }),
  name: z
    .string({ required_error: 'Name is required!' })
    .min(2, { message: 'Name should be at least 2 character!' })
    .max(255, { message: "Name shouldn't be more than 255 character!" }),
  phone: z.string().optional(),
  email: z
    .string({ required_error: 'Email is required!' })
    .email({ message: 'Provide a valid email!' }),
  gender: z
    .enum([...Object.values(EGender)] as [string, ...string[]])
    .optional(),
  imgae: z.string().optional(),
  role: z
    .enum([...Object.values(ERole)] as [string, ...string[]])
    .optional()
    .default(ERole.PATIENT),
  dateOfBirth: z.string().optional(),
});

const updateAnUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    gender: z
      .enum([...Object.values(EGender)] as [string, ...string[]])
      .optional(),
    image: z.string().optional(),
    role: z.enum([...Object.values(ERole)] as [string, ...string[]]).optional(),
    dateofBirth: z.string().optional(),
  }),
});

export const UserValidation = { createAnUserZodSchema, updateAnUserZodSchema };
