import { SearchTerm } from '../../../types/common';
import { EGender, ERole, User } from '@prisma/client';

type CreateUserRequest = Pick<User, 'id' | 'name' | 'email'>;

type UserFilters = {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  gender?: EGender;
  role?: ERole;
  dateOfBirth?: string;
} & SearchTerm;

export { CreateUserRequest, UserFilters };
