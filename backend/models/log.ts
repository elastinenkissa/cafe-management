import mongoose from 'mongoose';

import { EmployeeType } from './employee';
import { CafeType } from './cafe';

export interface Change {
  by: EmployeeType;
  timestamp: string;
}

export interface LogType extends mongoose.Document {
  id: string;
  action: string;
  cafe: CafeType;
  change: Change;
  from: string;
  to?: string;
  orders: Array<string>;
}

const changeSchema = new mongoose.Schema<Change>({
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  timestamp: String
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
  to: String,
  action: {
    type: String,
    required: true
  },
  cafe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cafe'
  },
  orders: [
    {
      type: String
    }
  ]
});

logSchema.pre('save', function (next) {
  const date = new Date();

  const timestamp = `${date.toLocaleDateString()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  this.change.timestamp = timestamp;

  next();
});

logSchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  }
});

export const Log = mongoose.model('Log', logSchema);
