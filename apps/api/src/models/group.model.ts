import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Task, TaskSchema } from './task.model';

export enum GroupStatus {
  WAITING_FOR_TASKS = 'WAITING_FOR_TASKS',
  WAITING_FOR_OPERATOR = 'WAITING_FOR_OPERATOR',
}
export enum GroupActive {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ALL = 'all',
}

export enum TaskSort {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}
@Schema()
export class Group extends Document {
  @Prop({ type: Number, unique: true, sparse: true, default: 1, index: true })
  groupId: number;

  @Prop({ required: true, enum: GroupActive, default: GroupActive.INACTIVE })
  active: GroupActive;

  @Prop({
    required: true,
    enum: GroupStatus,
    default: GroupStatus.WAITING_FOR_TASKS,
  })
  status: GroupStatus;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: true })
  canDelete: boolean;

  @Prop({ required: true, default: 0 })
  priority: number;

  @Prop({ type: [{ type: TaskSchema, default: [] }] })
  tasks: Task[];

  @Prop({
    type: {
      callTime: { type: Number, default: 0 },
      callback: { type: Number, default: 0 },
      callbackAttempt: { type: Number, default: 0 },
      postProcessing: { type: Number, default: 0 },
      busy: { type: Number, default: 0 },
      notAvailable: { type: Number, default: 0 },
      noCall: { type: Number, default: 0 },
      interrupted: { type: Number, default: 0 },
    },
  })
  callback: {
    callTime: number;
    callback: number;
    callbackAttempt: number;
    postProcessing: number;
    busy: number;
    notAvailable: number;
    noCall: number;
    interrupted: number;
  };

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: Types.ObjectId[];

  @Prop({ default: null })
  webhookLink: string;

  @Prop({ default: null })
  schedule: string;

  @Prop({ default: null })
  line: string;

  @Prop({ default: 0 })
  lined_up: number;

  @Prop({ default: 0 })
  overdue: number;

  @Prop({ default: false })
  activeGroup: boolean;

  @Prop({
    type: {
      Monday: {
        with: { type: String, default: null },
        on: { type: String, default: null },
      },
      Tuesday: {
        with: { type: String, default: null },
        on: { type: String, default: null },
      },
      Wednesday: {
        with: { type: String, default: null },
        on: { type: String, default: null },
      },
      Thursday: {
        with: { type: String, default: null },
        on: { type: String, default: null },
      },
      Friday: {
        with: { type: String, default: null },
        on: { type: String, default: null },
      },
      Saturday: {
        with: { type: String, default: null },
        on: { type: String, default: null },
      },
      Sunday: {
        with: { type: String, default: null },
        on: { type: String, default: null },
      },
    },
  })
  dayTime: {
    Monday: { with?: string; on?: string };
    Tuesday: { with?: string; on?: string };
    Wednesday: { with?: string; on?: string };
    Thursday: { with?: string; on?: string };
    Friday: { with?: string; on?: string };
    Saturday: { with?: string; on?: string };
    Sunday: { with?: string; on?: string };
  };

  @Prop({
    enum: TaskSort,
    default: TaskSort.NEWEST,
  })
  sortBy: TaskSort;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
