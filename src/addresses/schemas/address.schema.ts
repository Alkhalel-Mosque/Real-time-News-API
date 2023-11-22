import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    userId: Types.ObjectId;
    @Prop()
    name: string;
    @Prop()
    city: string;
    @Prop()
    street: string;
    @Prop()
    locationDetails: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);