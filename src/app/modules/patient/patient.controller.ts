import pick from '../../../shared/pick';
import { Patient } from '@prisma/client';
import { Request, Response } from 'express';
import { PatientService } from './patient.service';
import { PatientConstant } from './patient.constant';
import catchAsync from '../../../shared/catch-async';
import paginationFields from '../../../lib/pagination';
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

const getAllPatients = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, PatientConstant.patientFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const { meta, data } = await PatientService.getAllPatients(
    filters,
    paginationOptions,
  );

  sendResponse<Patient[]>(res, {
    statusCode: 200,
    success: true,
    message: 'All patients retrieved',
    meta,
    data,
  });
});

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
  getAllPatients,
  getAPatientByUserId,
};
