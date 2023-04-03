import mongoose from 'mongoose';

export interface MenuType {
  id: string;
  name: string;
  price: number;
}

const menuItemSchema = new mongoose.Schema<MenuType>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  }
});

menuItemSchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  }
});

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
