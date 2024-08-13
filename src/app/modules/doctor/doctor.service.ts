import { ERole } from '@prisma/client';
import prisma from '../../../lib/prisma';
import ApiError from '../../../errors/api-error';
import { UserService } from '../user/user.service';
import { CreateAUserAndDoctorRequest } from './doctor.type';

const createADoctor = async (data: CreateAUserAndDoctorRequest) => {
  const doctor = await prisma.$transaction(async tx => {
    const user = await UserService.createAUser(tx, {
      role: ERole.DOCTOR,
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

export const DoctorService = { createADoctor };
