import mongoose from 'mongoose';

import { OrderType } from './order';

export interface TableType {
  id: string;
  name: string;
  orders: Array<OrderType>;
}

interface TableModel extends mongoose.Model<TableType> {
  getNextNumber: () => Promise<number>;
}

const tableSchema = new mongoose.Schema<TableType>({
  name: {
    type: String
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ]
});

tableSchema.statics.getNextNumber = async function () {
  const count = await this.countDocuments();
  return count + 1;
};

tableSchema.pre('save', async function (next) {
  if (this.isNew) {
    let number = await this.constructor.getNextNumber();
    let existingTable = await this.constructor.findOne({ name: `Table ${number}` });
    while (existingTable) {
      number++;
      existingTable = await this.constructor.findOne({ name: `Table ${number}` });
    }
    this.name = `Table ${number}`;
  }
  next();
});

tableSchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  }
});

export const Table = mongoose.model('Table', tableSchema);
