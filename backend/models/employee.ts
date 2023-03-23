import mongoose from 'mongoose';

import { CafeType } from './cafe';

export interface EmployeeType {
  id: string;
  username: string;
  password: string;
  name: string;
  token: string;
  cafe: CafeType;
}

const employeeSchema = new mongoose.Schema<EmployeeType>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  token: String,
  cafe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cafe'
  }
});

employeeSchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  }
});

export const Employee = mongoose.model('Employee', employeeSchema);
