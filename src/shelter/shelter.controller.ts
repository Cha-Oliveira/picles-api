import { Body, Controller, Get, Inject, Patch, Post, Put } from '@nestjs/common';
import GetShelterDetailsUseCaseOutput from './usecases/dtos/get.shelter.details.usercase.output';
import { IUseCase } from 'src/domain/iusecase.interface';
import ShelterToken from './shelter.tokens';
import UpdateShelterControllerInput from './dtos/update.shelter.controller.input';
import UpdateShelterDetailsUseCaseOutput from './usecases/dtos/update.shelter.details.usecase.output';
import UpdateShelterDetailsUseCaseInput from './usecases/dtos/update.shelter.details.usecase.input';

@Controller('shelter')
export class ShelterController {

    @Inject(ShelterToken.getShelterDetailsUseCase)
    private readonly getShelterDetailsUseCase: IUseCase<null, GetShelterDetailsUseCaseOutput>

    @Inject(ShelterToken.updateShelterDetailsUseCase)
    private readonly updateShelterDetailsUseCase: IUseCase<UpdateShelterDetailsUseCaseInput, UpdateShelterDetailsUseCaseOutput>

    @Get()
    async getShelterDetails(): Promise<GetShelterDetailsUseCaseOutput>{
        return await this.getShelterDetailsUseCase.run(null)
    }

    @Put()
    async updateShelterDetails(@Body() input: UpdateShelterControllerInput): Promise<UpdateShelterDetailsUseCaseInput> {
       const useCaseInput = new UpdateShelterDetailsUseCaseInput({...input})
       return await this.updateShelterDetailsUseCase.run(useCaseInput)
    }

}
