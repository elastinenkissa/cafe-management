import { NextFunction, Request, Response } from 'express';
import { Document, Types } from 'mongoose';
import jwt from 'jsonwebtoken';

import { Cafe, CafeType } from '../models/cafe';
import { Employee, EmployeeType } from '../models/employee';

declare module 'express-serve-static-core' {
  interface Request {
    cafe?:
      | (Document<unknown, {}, CafeType> &
          Omit<CafeType & { _id: Types.ObjectId }, never>)
      | null;
    employee?:
      | (Document<unknown, {}, EmployeeType> &
          Omit<EmployeeType & { _id: Types.ObjectId }, never>)
      | null;
  }
}

export const getCurrentCafe = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const currentCafe = await Cafe.findById(req.params.id);

  if (!currentCafe) {
    throw new Error('Cafe does not exist.');
  }

  req.cafe = currentCafe;
  next();
};

export const getEmployee = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token =
    req.get('authorization')?.startsWith('bearer') &&
    req.get('authorization')?.split(' ')[1];

  if (!token) {
    throw new Error('Unauthorized.');
  }

  interface Employee {
    id: string;
  }

  const verifiedToken = jwt.verify(token, 'blehh') as Employee;

  const verifiedEmployee = await Employee.findById(verifiedToken.id);

  if (!verifiedEmployee) {
    throw new Error('Unauthorized.');
  }

  req.employee = verifiedEmployee;

  next();
};

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.name === 'ValidationError') {
    res.status(400).json({ message: error.message });
  } else {
    res.status(404).json({ message: error.message });
  }

  next(error);
};
