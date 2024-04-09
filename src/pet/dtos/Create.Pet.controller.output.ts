import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length, isString } from "class-validator"

export default class CreatePetUseCaseOutput {
    name: string;
    type: string;
    size: string;
    gender: string;
    bios: string;

    constructor(data: Partial<CreatePetUseCaseOutput>){
        Object.assign(this, data);
    }
}