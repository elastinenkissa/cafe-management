import mongoose from 'mongoose';

export interface EmployeeType {
  id: string;
  name: string;
  token: string;
  isOwner?: boolean;
}

const employeeSchema = new mongoose.Schema<EmployeeType>({
  name: {
    type: String,
    required: true,
    unique: true
  },

  token: String,
  isOwner: Boolean
});

employeeSchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  }
});

export const Table = mongoose.model('Employee', employeeSchema);
