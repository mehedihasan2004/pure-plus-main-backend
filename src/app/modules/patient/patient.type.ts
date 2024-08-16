import { Patient, User } from '@prisma/client';
import { SearchTerm } from '../../../types/common';

type CreateAnUserWithPatientRequest = {
  user: Omit<User, 'role'>;
  patient?: Omit<Patient, 'userId'>;
};

type PatientFilters = {
  userId?: string;
  emergencyContactNumber?: string;
} & SearchTerm;

type UpdateAPatientIncludingUserByUserIdRequest = {
  user?: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;
  patient?: Partial<Omit<Patient, 'userId' | 'createdAt' | 'updatedAt'>>;
};

export {
  CreateAnUserWithPatientRequest,
  PatientFilters,
  UpdateAPatientIncludingUserByUserIdRequest,
};
