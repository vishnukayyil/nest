// src/tasks/interfaces/task.interface.ts
import { Document } from 'mongoose';

export interface ITask extends Document {
  _id: string;
  title: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  createdAt?: Date;
  updatedAt?: Date;
}
