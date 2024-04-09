import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/domain/iusecase.interface";
import CreatePetControllerInput from "../dtos/create.pet.controller.input";
import CreatePetUseCaseInput from "../dtos/create.pet.controller.input";

@Injectable()
export default class CreatPetUseCase 
implements IUseCase<CreatePetUseCaseInput, CredentialPropertiesOutput>{
    run(input: CreatePetControllerInput): Promise<CredentialPropertiesOutput> {
        throw new Error("Method not implemented.");
    }
    
}