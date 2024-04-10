export default class GetPetByIdUsecaseOutput{
        id: string;
        name: string;
        type: string;
        size: string;
        gender: string;
        bio: string;
        photo: string;
    	createdAt: Date;
    	updatedAt: Date;
    
        constructor(data: Partial<GetPetByIdUsecaseOutput>){
            Object.assign(this, data);
        }
}