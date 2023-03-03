import mongoose from 'mongoose';

import { OrderType } from './order';

export interface Deptor {
  id: string;
  name: string;
  orders: Array<OrderType>;
}

const deptorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ]
});

deptorSchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  }
});

export const Deptor = mongoose.model('Deptor', deptorSchema);
