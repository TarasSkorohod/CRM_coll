import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop({ unique: true, sparse: true })
  orderCRM: string;

  @Prop({ required: true })
  order: string;

  @Prop({ required: true })
  number: string;

  @Prop({ type: Number, default: null })
  callTime: number | null;

  @Prop({ default: Date.now })
  createdOn: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
