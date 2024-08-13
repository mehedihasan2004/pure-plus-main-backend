/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from '../../../lib/prisma';
import { DB } from '../../../types/prisma';
import { Prisma, User } from '@prisma/client';
import { UserConstant } from './user.constant';
import ApiError from '../../../errors/api-error';
import { GenericResponse } from '../../../types/common';
import { PaginationOptions } from '../../../types/pagination';
import calculatePagination from '../../../helpers/pagination';
import { CreateUserRequest, UpdateUserRequest, UserFilters } from './user.type';

const createAUser = async (db: DB, data: CreateUserRequest) => {
  const isUserExist = await db.user.findUnique({ where: { id: data.id } });

  if (isUserExist) throw new ApiError(409, 'User already exist with this id!');

  const user = await db.user.create({ data });

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

const getAUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) throw new ApiError(404, 'User not found!');

  return user;
};

const updateAUserById = async (id: string, data: UpdateUserRequest) => {
  const user = await prisma.user.update({ where: { id }, data });

  return user;
};

const deleteAUserById = async (id: string) => {
  const user = await prisma.user.delete({ where: { id } });

  return user;
};

export const UserService = {
  createAUser,
  getAllUsers,
  getAUserById,
  updateAUserById,
  deleteAUserById,
};
