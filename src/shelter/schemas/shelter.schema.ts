import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument, SchemaType } from "mongoose"

export type ShelterDocument = HydratedDocument<Shelter>


@Schema({versionKey:false})
export class Shelter{
    @Prop({required: true})
    name: string
    @Prop({required: true})
    whatsApp: string
    @Prop({required: true})
    email: string
    @Prop({required: true})
    phone: string
    @Prop({required: true})
    createdAT: Date
    @Prop({required: true})
    updatet:Date
}

export const shelterSchema = SchemaFactory.createForClass(Shelter)