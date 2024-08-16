import { Patient, User } from '@prisma/client';

type CreateAnUserWithPatientRequest = {
  user: User;
  patient: Omit<Patient, 'userId'>;
};

export { CreateAnUserWithPatientRequest };
