/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose';


// export type Document = User & Document
enum userStatuses {
    'active',
    'blocked'
}

@Schema({
    timestamps: true,
})
export class User {
    @Prop({ required: true })
    name: string

    @Prop({ unique: true, required: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({ default: userStatuses.active })
    status: string
    enum: userStatuses
   
}
export const UserSchema = SchemaFactory.createForClass(User)

