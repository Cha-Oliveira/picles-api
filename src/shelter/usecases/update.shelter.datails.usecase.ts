import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/domain/iusecase.interface";
import GetShelterDetailsUseCaseOutput from "./dtos/get.shelter.details.usercase.output";
import { promises } from "dns";
import UpdateShelterDetailsUseCaseInput from "./dtos/update.shelter.details.usecase.input";
import UpdateShelterDetailsUseCaseOutput from "./dtos/update.shelter.details.usecase.output";
import { ShelterRepository } from "../shelter.repository";
import ShelterToken from "../shelter.tokens";
import { Shelter } from "../schemas/shelter.schema";

@Injectable()
export default class UpdateShelterDetailsUseCase
implements IUseCase<UpdateShelterDetailsUseCaseInput, UpdateShelterDetailsUseCaseOutput>
{
    constructor(
        @Inject(ShelterToken.shelterRepository)
        private readonly ShelterRepository: ShelterRepository
    ){}

    async run(input: UpdateShelterDetailsUseCaseInput):
    Promise<UpdateShelterDetailsUseCaseOutput>{
        //throw new Error("Method not implemented.");

        await this.ShelterRepository.update(input)

        const shelter = await this.ShelterRepository.get()

        return new UpdateShelterDetailsUseCaseOutput({
            name: shelter.name,
            phone: shelter.phone,
            whatsApp: shelter.whatsApp,
            email: shelter.email,
            updatedAt: shelter.updatedAt,
            createdAt: shelter.createdAt

        })
    }
    
}