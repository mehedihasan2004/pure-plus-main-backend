import { User } from '@prisma/client';
import pick from '../../../shared/pick';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { UserConstant } from './user.constant';
import catchAsync from '../../../shared/catch-async';
import paginationFields from '../../../lib/pagination';
import sendResponse from '../../../shared/send-response';

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

const getAnUserById = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.getAnUserById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved',
    data,
  });
});

const updateAnUserById = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.updateAnUserById(req.params.id, req.body);

  sendResponse<User>(res, {
    statusCode: 200,
    success: true,
    message: 'User updated',
    data,
  });
});

const deleteAnUserById = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.deleteAnUserById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted',
    data,
  });
});

export const UserController = {
  getAllUsers,
  getAnUserById,
  updateAnUserById,
  deleteAnUserById,
};
