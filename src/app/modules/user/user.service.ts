import prisma from '../../../lib/prisma';
import { CreateUserRequest } from './user.type';
import ApiError from '../../../errors/api-error';

const createUser = async (data: CreateUserRequest) => {
  const isUserExist = await prisma.user.findUnique({ where: { id: data.id } });

  if (isUserExist) throw new ApiError(409, 'User already exist with this id!');

  const user = await prisma.user.create({ data });

  if (!user) throw new ApiError(500, 'Failed to create user!');

  return user;
};

export const UserService = { createUser };
