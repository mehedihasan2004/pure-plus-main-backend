import { ERole } from '@prisma/client';
import prisma from '../../../lib/prisma';
import ApiError from '../../../errors/api-error';
import { CreateAnUserWithPatientRequest } from './patient.type';

const createAnUserWithPatient = async ({
  user: userData,
  patient: patientData,
}: CreateAnUserWithPatientRequest) => {
  const isUserExist = await prisma.user.findUnique({
    where: { id: userData.id },
  });

  if (isUserExist) throw new ApiError(409, 'User already exist with this id!');

  const patient = await prisma.$transaction(async tx => {
    const user = await tx.user.create({
      data: { role: ERole.PATIENT, ...userData },
    });

    if (!user) throw new ApiError(500, 'Failed to create user!');

    const newPatient = await tx.patient.create({
      data: { userId: user.id, ...patientData },
      include: { user: true },
    });

    return newPatient;
  });

  if (!patient) throw new ApiError(500, 'Failed to create patient!');

  return patient;
};

export const PatientService = { createAnUserWithPatient };
