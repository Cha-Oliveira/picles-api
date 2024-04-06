import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/domain/iusecase.interface";
import GetShelterDetailsUseCaseOutput from "./dtos/get.shelter.details.usercase.output";
import { promises } from "dns";
import UpdateShelterDetailsUseCaseInput from "./dtos/update.shelter.details.usecase.input";
import UpdateShelterDetailsUseCaseOutput from "./dtos/update.shelter.details.usecase.output";

@Injectable()
export default class UpdateShelterDetailsUseCase
implements IUseCase<UpdateShelterDetailsUseCaseInput, UpdateShelterDetailsUseCaseOutput>
{
    run(input: UpdateShelterDetailsUseCaseInput):
    Promise<UpdateShelterDetailsUseCaseOutput>{
        throw new Error("Method not implemented.");
    }
    
}