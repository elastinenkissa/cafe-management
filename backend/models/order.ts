import mongoose from 'mongoose';

import { TableType } from './table';
import { DeptorType } from './deptor';

export interface OrderType {
  id: string;
  name: string;
  price: number;
  table: TableType;
  deptor: DeptorType;
}

const orderSchema = new mongoose.Schema<OrderType>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table'
  },
  deptor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deptor'
  }
});

orderSchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  }
});

export const Order = mongoose.model('Order', orderSchema);
