import mongoose from 'mongoose';

export interface CafeType {
    id: string;
    name: string;
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }
}

const cafeSchema = new mongoose.Schema