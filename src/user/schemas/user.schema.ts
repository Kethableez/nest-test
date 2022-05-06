/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
