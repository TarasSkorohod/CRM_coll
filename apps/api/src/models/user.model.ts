import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Status } from './status.model';

export enum UserRole {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
}
const TelephonySubSchema = new MongooseSchema(
  {
    telephonyId: { type: Types.ObjectId, ref: 'Telephony' },
    inputLine: { type: Boolean, default: false },
  },
  { _id: false },
);

@Schema()
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.OPERATOR,
    required: true,
  })
  role: UserRole;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isOnline: boolean;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'Status',
  })
  status: Types.ObjectId | Status;

  @Prop([TelephonySubSchema])
  telephony: any[];
}

export const UserSchema = SchemaFactory.createForClass(User);
