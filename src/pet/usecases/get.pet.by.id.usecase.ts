import { IUseCase } from "src/domain/iusecase.interface";
import GetPetByIdUsecaseInput from "./dtos/get.pet.by.id.usecase.input";
import GetPetByIdUsecaseOutput from "./dtos/get.pet.by.id.usecase.output";
import { constrainedMemory } from "process";
import { Inject, Injectable } from "@nestjs/common";
import PetTokens from "../pet.tokens";
import IPetRepository from "../interfaces/pet.repository.interface";
import { promises } from "dns";
import { Pet } from "../schemas/pet.schemas";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import AppTokens from "src/app.tokens";
import IFileService from "../interfaces/file.service.interface";

@Injectable()
export default class GetPetByIdUsecase implements IUseCase<GetPetByIdUsecaseInput, GetPetByIdUsecaseOutput> {

    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository,

        @Inject(AppTokens.fileService)
        private readonly fileService: IFileService
    ){}

   async run(input: GetPetByIdUsecaseInput): Promise<GetPetByIdUsecaseOutput> {
        const pet = await this.getPetById(input.id)

        if(pet === null){
            throw new PetNotFoundError()
        }

        const petPhoto = !!pet.photo ? (await this.fileService.readFile(pet.photo)).toString('base64'):null

        return new GetPetByIdUsecaseOutput({
            id: pet._id,
            name: pet.name,
            type: pet.type,
            size: pet.size,
            gender: pet.gender,
            bio: pet.bio,
            photo: pet.photo,
            createdAt: pet.createdAt,
            updatedAt: pet.updatedAt
        });
    }
    
    private async getPetById(id: string): Promise<Pet>{
        try {
            return await this.petRepository.getById(id)
        } catch (error) {
            return null
        }
    }
}