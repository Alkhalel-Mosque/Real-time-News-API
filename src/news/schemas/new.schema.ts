import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NewDocument = HydratedDocument<New>;

@Schema()
export class New {
    @Prop()
    title: string;
    @Prop()
    description: string;
}

export const NewSchema = SchemaFactory.createForClass(New);