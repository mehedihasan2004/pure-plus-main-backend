import { SearchTerm } from '../../../types/common';
import { Doctor, EDepartment, ERank, User } from '@prisma/client';

type CreateAUserAndDoctorRequest = {
  user: Pick<User, 'id' | 'name' | 'email'>;
  doctor: Omit<Doctor, 'userId'>;
};

type DoctorFilters = {
  userId?: string;
  department?: EDepartment;
  rank?: ERank;
} & SearchTerm;

type UpdateADoctorIncludingUserByUserIdRequest = {
  user?: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;
  doctor?: Partial<Omit<Doctor, 'userId' | 'createdAt' | 'updatedAt'>>;
};

export {
  CreateAUserAndDoctorRequest,
  DoctorFilters,
  UpdateADoctorIncludingUserByUserIdRequest,
};
