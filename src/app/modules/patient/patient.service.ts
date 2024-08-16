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
    const user = await tx.user.create({ data: userData });

    if (!user) throw new ApiError(500, 'Failed to create user!');

    const newPatient = await tx.patient.create({
      data: { userId: user.id, ...patientData },
    });

    return newPatient;
  });

  if (!patient) throw new ApiError(500, 'Failed to create patient!');

  return patient;
};

export const PatientService = { createAnUserWithPatient };
