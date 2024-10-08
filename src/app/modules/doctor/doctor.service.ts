/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from '../../../lib/prisma';
import ApiError from '../../../errors/api-error';
import { UserService } from '../user/user.service';
import { DoctorConstant } from './doctor.constant';
import { Doctor, EUserRole, Prisma } from '@prisma/client';
import { GenericResponse } from '../../../types/common';
import { PaginationOptions } from '../../../types/pagination';
import calculatePagination from '../../../helpers/pagination';
import {
  DoctorFilters,
  CreateAnUserAndDoctorRequest,
  UpdateADoctorIncludingUserByUserIdRequest,
} from './doctor.type';

const createADoctor = async (
  data: CreateAnUserAndDoctorRequest,
): Promise<Doctor> => {
  const doctor = await prisma.$transaction(async tx => {
    const user = await UserService.createAnUser(tx, {
      role: EUserRole.DOCTOR,
      ...data.user,
    });

    const isDoctorExist = await tx.doctor.findUnique({
      where: { userId: user.id },
    });

    if (isDoctorExist)
      throw new ApiError(409, 'Doctor already exist with this user id!');

    const newDoctor = await tx.doctor.create({
      data: { userId: user.id, ...data.doctor },
      include: { user: true },
    });

    return newDoctor;
  });

  if (!doctor) throw new ApiError(500, 'Failed to create doctor!');

  return doctor;
};

const getAllDoctors = async (
  { searchTerm, ...filterData }: DoctorFilters,
  paginationOptions: PaginationOptions,
): Promise<GenericResponse<Doctor[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const pipeline = [];

  if (searchTerm) {
    pipeline.push({
      OR: DoctorConstant.doctorSearchableFields.map(field => ({
        [field]: { contains: searchTerm, mode: 'insensitive' },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    pipeline.push({
      AND: Object.keys(filterData).map(key => {
        if (DoctorConstant.doctorRelationalFields.includes(key)) {
          return {
            [DoctorConstant.doctorRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return { [key]: { equals: (filterData as any)[key] } };
        }
      }),
    });
  }

  const where: Prisma.DoctorWhereInput = { AND: pipeline };

  const doctors = await prisma.doctor.findMany({
    where,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { updatedAt: 'desc' },
    include: { user: true },
  });

  const total = await prisma.doctor.count({ where });

  return { meta: { total, page, limit }, data: doctors };
};

const getADoctorByUserId = async (userId: string): Promise<Doctor> => {
  const doctor = await prisma.doctor.findUnique({
    where: { userId },
    include: { user: true },
  });

  if (!doctor) throw new ApiError(404, 'Doctor not found!');

  return doctor;
};

const updateADoctorIncludingUserByUserId = async (
  userId: string,
  data: UpdateADoctorIncludingUserByUserIdRequest,
): Promise<Doctor> => {
  const doctor = await prisma.$transaction(async tx => {
    if (data.user) {
      await tx.user.update({ where: { id: userId }, data: data.user });
    }

    if (data.doctor) {
      return await tx.doctor.update({
        where: { userId },
        data: data.doctor,
        include: { user: true },
      });
    } else {
      return await tx.doctor.findUnique({
        where: { userId },
        include: { user: true },
      });
    }
  });

  if (!doctor) throw new ApiError(500, 'Failed to update the doctor!');

  return doctor;
};

const deleteADoctorIncludingUserByUserId = async (
  userId: string,
): Promise<Doctor> => {
  const doctor = await prisma.$transaction(async tx => {
    const deletedDoctor = await tx.doctor.delete({
      where: { userId },
      include: { user: true },
    });

    await tx.user.delete({ where: { id: userId } });

    return deletedDoctor;
  });

  if (!doctor) throw new ApiError(500, 'Failed to delete doctor!');

  return doctor;
};

export const DoctorService = {
  createADoctor,
  getAllDoctors,
  getADoctorByUserId,
  updateADoctorIncludingUserByUserId,
  deleteADoctorIncludingUserByUserId,
};
