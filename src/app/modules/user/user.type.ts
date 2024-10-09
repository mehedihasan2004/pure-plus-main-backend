import { z } from 'zod';
import { SearchTerm } from '../../../types/common';
import { UserValidation } from './user.validation';
import { EGender, EUserRole, User } from '@prisma/client';

type CreateAnUserRequest = Pick<User, 'id' | 'name' | 'email' | 'role'>;

type UserFilters = {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  gender?: EGender;
  role?: EUserRole;
  dateOfBirth?: string;
} & SearchTerm;

type UpdateAnUserRequest = Partial<
  z.infer<typeof UserValidation.updateAnUserZodSchema>
>;

export { CreateAnUserRequest, UserFilters, UpdateAnUserRequest };
