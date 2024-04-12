import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/domain/iusecase.interface";
import GetPetByIdUsecaseInput from "../dtos/get.pet.by.id.usecase.input";
import GetPetByIdUsecaseOutput from "../dtos/get.pet.by.id.usecase.output";

@Injectable()
export default class GetPetsUseCase implements IUseCase<GetPetByIdUsecaseInput, GetPetByIdUsecaseOutput>{
    run(input: GetPetByIdUsecaseInput): Promise<GetPetByIdUsecaseOutput> {
        throw new Error("Method not implemented.");
    }
    
}