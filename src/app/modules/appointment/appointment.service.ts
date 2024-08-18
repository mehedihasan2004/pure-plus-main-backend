import prisma from '../../../lib/prisma';
import { Appointment } from '@prisma/client';
import ApiError from '../../../errors/api-error';
import { CreateAnAppointmentRequest } from './appointment.type';

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

export const AppointmentService = { createAnAppointment };
