import { z } from 'zod';
import { SearchTerm } from '../../../types/common';
import { UserValidation } from './user.validation';
import { EGender, ERole, User } from '@prisma/client';

type CreateAnUserRequest = Pick<User, 'id' | 'name' | 'email' | 'role'>;

type UserFilters = {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  gender?: EGender;
  role?: ERole;
  dateOfBirth?: string;
} & SearchTerm;

type UpdateAnUserRequest = Partial<
  z.infer<typeof UserValidation.updateAnUserZodSchema>
>;

export { CreateAnUserRequest, UserFilters, UpdateAnUserRequest };
