import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import PetRepository from "../pet.repository";
import PetTokens from "../pet.tokens";
import DeletePetByIdUseCaseOutput from "./dtos/delete.pet.by.id.usecase.Output";
import DeletePetByIdUseCaseInput from "./dtos/delete.pet.by.id.usecase.input";
import { IUseCase } from "src/domain/iusecase.interface";
import UpdatePetByIdUseCaseOutput from "./dtos/update.pet.by.id.usecase.output";
import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { Pet } from "../schemas/pet.schemas";


export default class DeletePetByIdUseCase implements IUseCase<DeletePetByIdUseCaseInput, DeletePetByIdUseCaseOutput>{
    
    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: PetRepository
    ){}
    
    async run(input: DeletePetByIdUseCaseInput): Promise<DeletePetByIdUseCaseOutput> {
        const pet = await this.getPetById(input.id)

        if(!pet){
            throw new PetNotFoundError()
        }

        await this.petRepository.deleteById(input.id)

        return new DeletePetByIdUseCaseOutput()
    }

    private async getPetById(id: string): Promise<Pet>{
        try {
            return await this.petRepository.getById(id)
        } catch (error) {
            return null
        }
    }

}


 