import { Doctor } from '@prisma/client';
import { Request, Response } from 'express';
import { DoctorService } from './doctor.service';
import catchAsync from '../../../shared/catch-async';
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

export const DoctorController = { createADoctor };
