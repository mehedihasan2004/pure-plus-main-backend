import prisma from '../../../lib/prisma';
import { Appointment } from '@prisma/client';
import ApiError from '../../../errors/api-error';

const createAnAppointment = async (data: Appointment) => {
  const appointment = await prisma.appointment.create({ data });

  if (!appointment) throw new ApiError(500, 'Failed to create appointment!');

  return appointment;
};

export const AppointmentService = { createAnAppointment };
