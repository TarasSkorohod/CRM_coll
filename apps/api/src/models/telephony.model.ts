import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Telephony extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  sipInternalNumber: string;

  @Prop({ required: true })
  sipServer: string;

  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  inputLine: boolean;
}

export const TelephonySchema = SchemaFactory.createForClass(Telephony);
