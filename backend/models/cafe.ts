import mongoose from 'mongoose';

import { EmployeeType } from './employee';
import { TableType } from './table';
import { MenuType } from './menuItem';

export interface CafeType {
  id: string;
  name: string;
  currency: string;
  owner: EmployeeType;
  tables: Array<TableType>;
  menu: Array<MenuType>;
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
    ref: 'Employee',
    required: true
  },
  tables: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table'
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
