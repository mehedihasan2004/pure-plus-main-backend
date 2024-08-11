import { User } from '@prisma/client';

type CreateUserRequest = Pick<User, 'id' | 'name' | 'email'>;

export { CreateUserRequest };
