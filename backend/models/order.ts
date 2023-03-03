import mongoose from 'mongoose';

export interface OrderType {
  id: string;
  name: string;
  price: number;
}

const orderSchema = new mongoose.Schema<OrderType>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
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
