import mongoose, { Schema, Model } from 'mongoose';
import { IEmployee } from '../types/index';

// Define the Employee schema
const EmployeeSchema = new Schema<IEmployee>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name must not exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
      minlength: [2, 'Position must be at least 2 characters'],
      maxlength: [100, 'Position must not exceed 100 characters'],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create indexes for better query performance
EmployeeSchema.index({ email: 1 });
EmployeeSchema.index({ name: 1 });

// Export the model (handle hot reloading in development)
const Employee: Model<IEmployee> =
  mongoose.models.Employee || mongoose.model<IEmployee>('Employee', EmployeeSchema);

export default Employee;