import { Patient } from '@prisma/client';
import { Request, Response } from 'express';
import { PatientService } from './patient.service';
import catchAsync from '../../../shared/catch-async';
import sendResponse from '../../../shared/send-response';

const createAnUserWithPatient = catchAsync(
  async (req: Request, res: Response) => {
    const data = await PatientService.createAnUserWithPatient(req.body);

    sendResponse<Patient>(res, {
      statusCode: 200,
      success: true,
      message: 'Patient created',
      data,
    });
  },
);

const getAPatientByUserId = catchAsync(async (req: Request, res: Response) => {
  const data = await PatientService.getAPatientByUserId(req.params.id);

  sendResponse<Patient>(res, {
    statusCode: 200,
    success: true,
    message: 'Patient retrieved',
    data,
  });
});

export const PatientController = {
  createAnUserWithPatient,
  getAPatientByUserId,
};
