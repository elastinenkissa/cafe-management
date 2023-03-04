import mongoose from 'mongoose';

import { EmployeeType } from './employee';
import { TableType } from './table';
import { OrderType } from './order';

export interface Change {
  by: EmployeeType;
  timestamp: Date;
}

export interface LogType {
  message: string;
  change: Change;
  table: TableType;
  orders: Array<OrderType>;
}

const changeSchema = new mongoose.Schema<Change>({
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  timestamp: {
    type: Date,
    required: true
  }
});

const logSchema = new mongoose.Schema<LogType>({
  message: {
    type: String,
    required: true
  },
  change: {
    type: changeSchema,
    required: true
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
