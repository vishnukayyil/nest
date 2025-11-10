// src/types.ts
export interface Task {
  _id?: string;
  title: string;
  description?: string;
  status?: string;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
