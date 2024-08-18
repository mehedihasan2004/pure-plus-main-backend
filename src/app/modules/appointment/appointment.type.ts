import { Appointment } from '@prisma/client';

type CreateAnAppointmentRequest = Pick<Appointment, 'date' | 'timeSlot'> & {
  doctorId: string;
  patientId: string;
};

export { CreateAnAppointmentRequest };
