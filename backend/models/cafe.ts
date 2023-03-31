import mongoose from 'mongoose';

import { EmployeeType } from './employee';
import { TableType } from './table';
import { MenuType } from './menuItem';
import { DeptorType } from './deptor';

export interface CafeType {
  id: string;
  name: string;
  currency: string;
  owner: EmployeeType;
  tables: Array<TableType>;
  deptors: Array<DeptorType>;
  menu: Array<MenuType>;
}

const cafeSchema = new mongoose.Schema<CafeType>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  currency: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  tables: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table'
    }
  ],
  deptors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Deptor'
    }
  ],
  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem'
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
