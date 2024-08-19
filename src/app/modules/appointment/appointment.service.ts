/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from '../../../lib/prisma';
import ApiError from '../../../errors/api-error';
import { Appointment, Prisma } from '@prisma/client';
import { GenericResponse } from '../../../types/common';
import { AppointmentConstant } from './appointment.constant';
import { PaginationOptions } from '../../../types/pagination';
import calculatePagination from '../../../helpers/pagination';
import {
  AppointmentFilters,
  CreateAnAppointmentRequest,
} from './appointment.type';

const createAnAppointment = async (
  data: CreateAnAppointmentRequest,
): Promise<Appointment> => {
  const doctor = await prisma.doctor.findUnique({
    where: { userId: data.doctorId },
  });

  if (!doctor) throw new ApiError(404, 'Doctor not found with this doctor id!');

  const patient = await prisma.patient.findUnique({
    where: { userId: data.patientId },
  });

  if (!patient)
    throw new ApiError(404, 'Patient not found with this patient id!');

  const isSlotBooked = await prisma.appointment.findFirst({
    where: { date: data.date, timeSlot: data.timeSlot },
  });

  if (isSlotBooked) throw new ApiError(409, 'The slot is booked on that date!');

  const appointment = await prisma.appointment.create({
    data: { department: doctor.department, ...data },
    include: { patient: true, doctor: true },
  });

  if (!appointment) throw new ApiError(500, 'Failed to create appointment!');

  return appointment;
};

const getAllAppointments = async (
  { searchTerm, ...filterData }: AppointmentFilters,
  paginationOptions: PaginationOptions,
): Promise<GenericResponse<Appointment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const pipeline = [];

  if (searchTerm) {
    pipeline.push({
      OR: AppointmentConstant.appointmentSearchableFields.map(field => ({
        [field]: { contains: searchTerm, mode: 'insensitive' },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    pipeline.push({
      AND: Object.keys(filterData).map(key => {
        if (AppointmentConstant.appointmentRelationalFields.includes(key)) {
          return {
            [AppointmentConstant.appointmentRelationalFieldsMapper[key]]: {
              userId: (filterData as any)[key],
            },
          };
        } else {
          return { [key]: { equals: (filterData as any)[key] } };
        }
      }),
    });
  }

  const where: Prisma.AppointmentWhereInput = { AND: pipeline };

  const doctors = await prisma.appointment.findMany({
    where,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { updatedAt: 'desc' },
    include: { doctor: true, patient: true },
  });

  const total = await prisma.appointment.count({ where });

  return { meta: { total, page, limit }, data: doctors };
};

const getAnAppointmentById = async (id: string): Promise<Appointment> => {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: { patient: true, doctor: true },
  });

  if (!appointment) throw new ApiError(404, 'Appointment not found!');

  return appointment;
};

const updateAnAppointmentById = async (
  id: string,
  data: Partial<Appointment>,
): Promise<Appointment> => {
  const appointment = await prisma.appointment.update({
    where: { id },
    data,
    include: { patient: true, doctor: true },
  });

  return appointment;
};

export const AppointmentService = {
  createAnAppointment,
  getAllAppointments,
  getAnAppointmentById,
  updateAnAppointmentById,
};
