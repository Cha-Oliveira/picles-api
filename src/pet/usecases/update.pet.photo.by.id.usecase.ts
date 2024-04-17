import { IUseCase } from "src/domain/iusecase.interface";
import UpdatePetPhotoByIdUseCaseOutput from "./dtos/update.pet.photo.by.id.usecase.output";
import UpdadePetPhotoByIdUseCaseInput from "./dtos/update.pet.photo.by.id.usecase.input";
import PetRepository from "src/pet/pet.repository";
import PetTokens from "src/pet/pet.tokens";
import { Inject } from "@nestjs/common";
import { Pet } from "src/pet/schemas/pet.schemas";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import AppTokens from "src/app.tokens";
import IFileService from "src/pet/interfaces/file.service.interface";

export default class UpdatePetPhotoByIdUseCase implements IUseCase<UpdadePetPhotoByIdUseCaseInput, UpdatePetPhotoByIdUseCaseOutput>{
    
    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: PetRepository,

        @Inject(AppTokens.fileService)
        private readonly fileService: IFileService
    ){}
    
    async run(input: UpdadePetPhotoByIdUseCaseInput): Promise<UpdatePetPhotoByIdUseCaseOutput> {
        const pet = await this.FindPetById(input.id)

        if(!pet){
        throw new PetNotFoundError()
        } 

        await this.petRepository.updateById({
        _id: input.id,
        photo: input.photoPatch,
        })

        const petPhoto = !!pet.photo ? (await this.fileService.readFile(pet.photo)).toString('base64'):null

         return new UpdatePetPhotoByIdUseCaseOutput({
            id: pet._id,
            name: pet.name,
            type: pet.type,
            size: pet.size,
            gender:  pet.gender,
            bio: pet.bio,
            photo: pet.photo,
            createdAt: pet.createdAt,
            updatedAt: pet.updatedAt
        })

    }    

    private async FindPetById(id: string): Promise<Pet>{
        try {
            return await this.petRepository.getById(id)
        } catch (error) {
            return null
        }
    }

}