import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length, isString } from "class-validator"

export default class UpdateShelterControllerInput {
    @IsString()
    @IsNotEmpty()
    name: string
    @IsString()
    @IsNotEmpty()
    @Length(10, 11)
    whatsapp: string
    @IsString()
    @IsNotEmpty()
    @IsNumberString()
    phone: string
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string
}