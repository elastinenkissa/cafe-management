import mongoose from 'mongoose';

import { EmployeeType } from './employee';
import { OrderType } from './order';
import { CafeType } from './cafe';

export interface Change {
  by: EmployeeType;
  timestamp: string;
}

export interface LogType {
  id: string;
  cafe: CafeType;
  change: Change;
  from: string;
  orders: Array<OrderType>;
}

const changeSchema = new mongoose.Schema<Change>({
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  timestamp: {
    type: String,
    required: true
  }
});

const logSchema = new mongoose.Schema<LogType>({
  change: {
    type: changeSchema,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  cafe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cafe'
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ]
});

logSchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  }
});

export const Log = mongoose.model('Log', logSchema);
