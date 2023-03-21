import mongoose from 'mongoose';

import { EmployeeType } from './employee';
import { TableType } from './table';

export interface CafeType {
  id: string;
  name: string;
  currency: string;
  owner: EmployeeType;
  tables: Array<TableType>;
}

const cafeSchema = new mongoose.Schema<CafeType>({
  name: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  tables: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table'
    }
  ]
});

cafeSchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  }
});

export const Cafe = mongoose.model('Cafe', cafeSchema);
