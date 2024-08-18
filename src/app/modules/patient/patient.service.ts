/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from '../../../lib/prisma';
import ApiError from '../../../errors/api-error';
import { UserService } from '../user/user.service';
import { PatientConstant } from './patient.constant';
import { GenericResponse } from '../../../types/common';
import { ERole, Patient, Prisma } from '@prisma/client';
import calculatePagination from '../../../helpers/pagination';
import { PaginationOptions } from '../../../types/pagination';
import {
  PatientFilters,
  CreateAnUserWithPatientRequest,
  UpdateAPatientIncludingUserByUserIdRequest,
} from './patient.type';

const createAnUserWithPatient = async (
  data: CreateAnUserWithPatientRequest,
): Promise<Patient> => {
  const isUserExist = await prisma.user.findUnique({
    where: { id: data.user.id },
  });

  if (isUserExist) throw new ApiError(409, 'User already exist with this id!');

  const patient = await prisma.$transaction(async tx => {
    const user = await UserService.createAnUser(tx, {
      role: ERole.PATIENT,
      ...data.user,
    });

    const isPatientExist = await tx.patient.findUnique({
      where: { userId: user.id },
    });

    if (isPatientExist)
      throw new ApiError(409, 'Patient already exist with this user id!');

    const newPatient = await tx.patient.create({
      data: { userId: user.id, ...data.patient },
      include: { user: true },
    });

    return newPatient;
  });

  if (!patient) throw new ApiError(500, 'Failed to create patient!');

  return patient;
};

const getAllPatients = async (
  { searchTerm, ...filterData }: PatientFilters,
  paginationOptions: PaginationOptions,
): Promise<GenericResponse<Patient[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const pipeline = [];

  if (searchTerm) {
    pipeline.push({
      OR: PatientConstant.patientSearchableFields.map(field => ({
        [field]: { contains: searchTerm, mode: 'insensitive' },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    pipeline.push({
      AND: Object.keys(filterData).map(key => {
        if (PatientConstant.patientRelationalFields.includes(key)) {
          return {
            [PatientConstant.patientRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return { [key]: { equals: (filterData as any)[key] } };
        }
      }),
    });
  }

  const where: Prisma.PatientWhereInput = { AND: pipeline };

  const doctors = await prisma.patient.findMany({
    where,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { updatedAt: 'desc' },
    include: { user: true },
  });

  const total = await prisma.patient.count({ where });

  return { meta: { total, page, limit }, data: doctors };
};

const getAPatientByUserId = async (userId: string): Promise<Patient> => {
  const patient = await prisma.patient.findUnique({
    where: { userId },
    include: { user: true },
  });

  if (!patient) throw new ApiError(404, 'Patient not found!');

  return patient;
};

const updateAPatientIncludingUserByUserId = async (
  userId: string,
  data: UpdateAPatientIncludingUserByUserIdRequest,
): Promise<Patient> => {
  const patient = await prisma.$transaction(async tx => {
    if (data.user) {
      await tx.user.update({ where: { id: userId }, data: data.user });
    }

    if (data.patient) {
      return await tx.patient.update({
        where: { userId },
        data: data.patient,
        include: { user: true },
      });
    } else {
      return await tx.patient.findUnique({
        where: { userId },
        include: { user: true },
      });
    }
  });

  if (!patient) throw new ApiError(500, 'Failed to update the patient!');

  return patient;
};

const deleteAPatientIncludingUserByUserId = async (
  userId: string,
): Promise<Patient> => {
  const patient = await prisma.$transaction(async tx => {
    const deletedPatient = await tx.patient.delete({
      where: { userId },
      include: { user: true },
    });

    await tx.user.delete({ where: { id: userId } });

    return deletedPatient;
  });

  if (!patient) throw new ApiError(500, 'Failed to delete patient!');

  return patient;
};

export const PatientService = {
  createAnUserWithPatient,
  getAllPatients,
  getAPatientByUserId,
  updateAPatientIncludingUserByUserId,
  deleteAPatientIncludingUserByUserId,
};
