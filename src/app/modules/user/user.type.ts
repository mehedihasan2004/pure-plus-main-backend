import { z } from 'zod';
import { SearchTerm } from '../../../types/common';
import { UserValidation } from './user.validation';
import { EGender, ERole, User } from '@prisma/client';

type CreateUserRequest = Pick<User, 'id' | 'name' | 'email' | 'role'>;

type UserFilters = {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  gender?: EGender;
  role?: ERole;
  dateOfBirth?: string;
} & SearchTerm;

type UpdateUserRequest = Partial<
  z.infer<typeof UserValidation.updateUserZodSchema>
>;

export { CreateUserRequest, UserFilters, UpdateUserRequest };
