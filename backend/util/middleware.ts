import { NextFunction, Request, Response } from 'express';
import { Document, Types } from 'mongoose';

import { Cafe, CafeType } from '../models/cafe';

declare module 'express-serve-static-core' {
  interface Request {
    cafe?:
      | (Document<unknown, {}, CafeType> &
          Omit<CafeType & { _id: Types.ObjectId }, never>)
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

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {};
