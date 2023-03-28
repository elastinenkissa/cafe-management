import { NextFunction, Request, Response } from 'express';
import { Document, Types } from 'mongoose';
import jwt from 'jsonwebtoken';

import { Cafe, CafeType } from '../models/cafe';
import { Employee, EmployeeType } from '../models/employee';
import { JWT_SECRET } from './config';

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

export const getEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.get('authorization');

  const token =
    authorization?.startsWith('bearer') && authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  interface Employee {
    id: string;
  }

  if (!JWT_SECRET) {
    return res.status(401).json({ message: 'Invalid secret.' });
  }

  const verifiedToken = jwt.verify(token, JWT_SECRET) as Employee;

  const verifiedEmployee = await Employee.findById(verifiedToken.id).populate(
    'cafe'
  );

  if (!verifiedEmployee) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  req.employee = verifiedEmployee;

  next();
};

export const getCurrentCafe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentCafe = await Cafe.findById(req.query.cafe);

  if (!currentCafe) {
    return res.status(404).json({ message: 'Cafe not found.' });
  }

  req.cafe = currentCafe;

  next();
};

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};
