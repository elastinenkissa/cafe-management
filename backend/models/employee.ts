import mongoose from 'mongoose';

export interface EmployeeType {
  id: string;
  login: string;
  password: string;
  name: string;
  token: string;
}

const employeeSchema = new mongoose.Schema<EmployeeType>({
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  token: String
});

employeeSchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  }
});

export const Employee = mongoose.model('Employee', employeeSchema);
