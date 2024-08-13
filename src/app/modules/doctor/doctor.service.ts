import { Doctor } from '@prisma/client';
import prisma from '../../../lib/prisma';
import ApiError from '../../../errors/api-error';

const createADoctor = async (data: Doctor) => {
  const isDoctorExist = await prisma.doctor.findUnique({
    where: { userId: data.userId },
  });

  if (isDoctorExist)
    throw new ApiError(409, 'Doctor already exist with this user id!');

  const doctor = await prisma.doctor.create({ data, include: { user: true } });

  return doctor;
};

export const DoctorService = { createADoctor };
