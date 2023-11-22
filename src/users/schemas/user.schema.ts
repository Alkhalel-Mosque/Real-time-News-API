import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string;
  @Prop({ required: true, unique: true })
  email: string
  @Prop({ required: true })
  password: string
  @Prop()
  role: 'ADMIN' | 'USER'
  @Prop()
  birthday: Date
  @Prop()
  country: string
  @Prop()
  gender: 'Male' | 'Female'
  @Prop()
  phoneNumber: string
}

export const UserSchema = SchemaFactory.createForClass(User);