import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, autoCreate: true })
export class User extends Document {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true }) email: string;
  @Prop() age: number;
  @Prop({ default: [] }) roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
