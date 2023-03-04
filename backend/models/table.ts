import mongoose from 'mongoose';

import { OrderType } from './order';

export interface TableType {
  id: string;
  name: string;
  orders: Array<OrderType>;
}

const tableSchema = new mongoose.Schema<TableType>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ]
});

tableSchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  }
});

export const Table = mongoose.model('Table', tableSchema);
