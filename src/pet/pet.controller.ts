import { Body, Controller, Inject, Post } from "@nestjs/common";
import CreatePetControllerInput from "./dtos/create.pet.controller.input";
import petTokens from "./pet.tokens";
import { IUseCase } from "src/domain/iusecase.interface";
import CreatePetControllerOutput from "./dtos/Create.Pet.controller.output";
import CreatePetUseCaseInput from "./usecases/dtos/create.pet.usecase.input";
import CreatePetUseCaseOutput from "./usecases/dtos/create.pet.usecase.output";


@Controller('pet')
export class PetController{

    /*@Inject(petTokens.CreatPetUseCase)
    private readonly createPetUseCase: IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutput>

    @Post()
    async createPet(@Body() Input: CreatePetControllerInput){
        const usecase = new CreatePetControllerInput({...Input})
        return await this.createPetUseCase.run(usecaseinput)
    }*/
}
