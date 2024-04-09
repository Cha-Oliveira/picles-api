import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length, isString } from "class-validator"

export default class CreatePetUseCaseInput {
    name: string;
    type: string;
    size: string;
    gender: string;
    bios: string;

    constructor(data: Partial<CreatePetUseCaseInput>){
        Object.assign(this, data);
    }
}