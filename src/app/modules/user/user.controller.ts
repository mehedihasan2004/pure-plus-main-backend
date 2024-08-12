import { User } from '@prisma/client';
import pick from '../../../shared/pick';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { UserConstant } from './user.constant';
import catchAsync from '../../../shared/catch-async';
import paginationFields from '../../../lib/pagination';
import sendResponse from '../../../shared/send-response';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.createUser(req.body);

  sendResponse<User>(res, {
    statusCode: 200,
    success: true,
    message: 'User created',
    data,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, UserConstant.userFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const { meta, data } = await UserService.getAllUsers(
    filters,
    paginationOptions,
  );

  sendResponse<User[]>(res, {
    statusCode: 200,
    success: true,
    message: 'All users retrieved',
    meta,
    data,
  });
});

export const UserController = { createUser, getAllUsers };
