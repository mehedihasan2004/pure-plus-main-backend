import pick from '../../../shared/pick';
import { Doctor } from '@prisma/client';
import { Request, Response } from 'express';
import { DoctorService } from './doctor.service';
import { DoctorConstant } from './doctor.constant';
import catchAsync from '../../../shared/catch-async';
import paginationFields from '../../../lib/pagination';
import sendResponse from '../../../shared/send-response';

const createADoctor = catchAsync(async (req: Request, res: Response) => {
  const data = await DoctorService.createADoctor(req.body);

  sendResponse<Doctor>(res, {
    statusCode: 200,
    success: true,
    message: 'Doctor created',
    data,
  });
});

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, DoctorConstant.doctorFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const { meta, data } = await DoctorService.getAllDoctors(
    filters,
    paginationOptions,
  );

  sendResponse<Doctor[]>(res, {
    statusCode: 200,
    success: true,
    message: 'All doctors retrieved',
    meta,
    data,
  });
});

const getADoctorByUserId = catchAsync(async (req: Request, res: Response) => {
  const data = await DoctorService.getADoctorByUserId(req.params.id);

  sendResponse<Doctor>(res, {
    statusCode: 200,
    success: true,
    message: 'Doctor retrieved',
    data,
  });
});

const updateADoctorIncludingUserByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const data = await DoctorService.updateADoctorIncludingUserByUserId(
      req.params.id,
      req.body,
    );

    sendResponse<Doctor>(res, {
      statusCode: 200,
      success: true,
      message: 'Doctor updated',
      data,
    });
  },
);

export const DoctorController = {
  createADoctor,
  getAllDoctors,
  getADoctorByUserId,
  updateADoctorIncludingUserByUserId,
};
