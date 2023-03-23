import mongoose from 'mongoose';

export interface MenuType {
  id: string;
  item: string;
  price: number;
}

const menuItemSchema = new mongoose.Schema<MenuType>({
  item: {
    type: String,
    required: true,
    unique: true
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
