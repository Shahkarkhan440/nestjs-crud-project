import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEnum } from "class-validator";
import { userObject } from "src/common/types";
import { User } from "./user.schema";


export enum bookmarkStatuses {
    'disabled',
    'active',
}

export enum categories  {
    'politics',
     'general',
    'sports'
}

@Schema({
    timestamps: true,
})

export class Bookmark {

    @Prop({required: true})
    name: string

    @Prop({requried: true})
    url: string

    @Prop({required: true})
    @IsEnum(categories)
    category: string

    @Prop({type: {}})
    user: {}

    @Prop({required: true, default: bookmarkStatuses.active})
    @IsEnum(bookmarkStatuses)
    status: string
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark)