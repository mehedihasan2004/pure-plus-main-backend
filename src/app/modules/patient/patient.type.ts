import { Patient, User } from '@prisma/client';

type CreateAnUserWithPatientRequest = {
  user: Omit<User, 'role'>;
  patient?: Omit<Patient, 'userId'>;
};

export { CreateAnUserWithPatientRequest };
