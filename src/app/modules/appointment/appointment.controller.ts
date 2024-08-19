import pick from '../../../shared/pick';
import { Request, Response } from 'express';
import { Appointment } from '@prisma/client';
import catchAsync from '../../../shared/catch-async';
import paginationFields from '../../../lib/pagination';
import sendResponse from '../../../shared/send-response';
import { AppointmentService } from './appointment.service';
import { AppointmentConstant } from './appointment.constant';

const createAnAppointment = catchAsync(async (req: Request, res: Response) => {
  const data = await AppointmentService.createAnAppointment(req.body);

  sendResponse<Appointment>(res, {
    statusCode: 200,
    success: true,
    message: 'Appointment created',
    data,
  });
});

const getAllAppointments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(
    req.query,
    AppointmentConstant.appointmentFilterableFields,
  );

  const paginationOptions = pick(req.query, paginationFields);

  const { meta, data } = await AppointmentService.getAllAppointments(
    filters,
    paginationOptions,
  );

  sendResponse<Appointment[]>(res, {
    statusCode: 200,
    success: true,
    message: 'All appointments retrieved',
    meta,
    data,
  });
});

const getAnAppointmentById = catchAsync(async (req: Request, res: Response) => {
  const data = await AppointmentService.getAnAppointmentById(req.params.id);

  sendResponse<Appointment>(res, {
    statusCode: 200,
    success: true,
    message: 'Appointment retrieved',
    data,
  });
});

const updateAnAppointmentById = catchAsync(
  async (req: Request, res: Response) => {
    const data = await AppointmentService.updateAnAppointmentById(
      req.params.id,
      req.body,
    );

    sendResponse<Appointment>(res, {
      statusCode: 200,
      success: true,
      message: 'Appointment updated',
      data,
    });
  },
);

export const AppointmentController = {
  createAnAppointment,
  getAllAppointments,
  getAnAppointmentById,
  updateAnAppointmentById,
};
