import { SearchTerm } from '../../../types/common';
import {
  Appointment,
  EDepartment,
  EPaymentStatus,
  EAppointmentStatus,
  EAppointmentTimeSlot,
} from '@prisma/client';

type CreateAnAppointmentRequest = Pick<Appointment, 'date' | 'timeSlot'> & {
  doctorId: string;
  patientId: string;
};

type AppointmentFilters = {
  department?: EDepartment;
  date?: string;
  timeSlot?: EAppointmentTimeSlot;
  status?: EAppointmentStatus;
  paymentStatus?: EPaymentStatus;
  followUpDate?: string;
  doctorId?: string;
  patientId?: string;
  createdAt?: string;
  updatedAt?: string;
} & SearchTerm;

export { CreateAnAppointmentRequest, AppointmentFilters };
