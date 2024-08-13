import { Doctor, User } from '@prisma/client';

type CreateAUserAndDoctorRequest = {
  user: Pick<User, 'id' | 'name' | 'email'>;
  doctor: Omit<Doctor, 'userId'>;
};

export { CreateAUserAndDoctorRequest };
