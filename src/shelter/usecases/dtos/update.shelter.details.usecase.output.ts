export default class UpdateShelterDetailsUseCaseOutput{
    name: string;
    whatsApp: string;
    email:string;
    phone: string;
    updatedAt: Date;
    createdAt: Date    

    constructor(data: Partial<UpdateShelterDetailsUseCaseOutput>){
        Object.assign(this, data);
    }
}