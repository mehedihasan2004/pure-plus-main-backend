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

export { CreateAnUserWithPatientRequest, PatientFilters };
