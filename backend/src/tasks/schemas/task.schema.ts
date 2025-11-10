// src/tasks/schemas/task.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' })
  status: 'Pending' | 'In Progress' | 'Completed';
}

export const TaskSchema = SchemaFactory.createForClass(Task);
