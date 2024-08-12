/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from '../../../lib/prisma';
import { Prisma, User } from '@prisma/client';
import { UserConstant } from './user.constant';
import ApiError from '../../../errors/api-error';
import { GenericResponse } from '../../../types/common';
import { CreateUserRequest, UserFilters } from './user.type';
import { PaginationOptions } from '../../../types/pagination';
import calculatePagination from '../../../helpers/pagination';

const createUser = async (data: CreateUserRequest) => {
  const isUserExist = await prisma.user.findUnique({ where: { id: data.id } });

  if (isUserExist) throw new ApiError(409, 'User already exist with this id!');

  const user = await prisma.user.create({ data });

  if (!user) throw new ApiError(500, 'Failed to create user!');

  return user;
};

const getAllUsers = async (
  { searchTerm, ...filterData }: UserFilters,
  paginationOptions: PaginationOptions,
): Promise<GenericResponse<User[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const pipeline = [];

  if (searchTerm) {
    pipeline.push({
      OR: UserConstant.userSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    pipeline.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const where: Prisma.UserWhereInput = {
    AND: pipeline,
  };

  const users = await prisma.user.findMany({
    where,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { updatedAt: 'desc' },
  });

  const total = await prisma.user.count({ where });

  return { meta: { total, page, limit }, data: users };
};

const getOneUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) throw new ApiError(404, 'User not found!');

  return user;
};

const deleteAUserById = async (id: string) => {
  const user = await prisma.user.delete({ where: { id } });

  return user;
};

export const UserService = {
  createUser,
  getAllUsers,
  getOneUserById,
  deleteAUserById,
};
