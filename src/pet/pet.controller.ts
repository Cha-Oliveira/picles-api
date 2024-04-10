import { BadRequestException, Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import { IUseCase } from 'src/domain/iusecase.interface';
import CreatePetUseCaseInput from './usecases/dtos/create.pet.usecase.input';
import PetTokens from './pet.tokens';
import CreatePetUseCaseOutput from './usecases/dtos/create.pet.usecase.output';
import GetPetByIdUsecaseInput from './dtos/get.pet.by.id.usecase.input';
import GetPetByIdUsecaseOutput from './dtos/get.pet.by.id.usecase.output';
import { json } from 'stream/consumers';

@Controller('pet')
export class PetController {

	@Inject(PetTokens.createPetUseCase)
	private readonly createPetUseCase: IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutput>

	@Inject(PetTokens.getPetByIdUseCase)
	private readonly getPetByIdUseCase: IUseCase<GetPetByIdUsecaseInput, GetPetByIdUsecaseOutput>

	@Post()
	async createPet(@Body() input: CreatePetControllerInput): Promise<CreatePetUseCaseOutput>{
		const useCaseInput = new CreatePetUseCaseInput({...input})
		return await this.createPetUseCase.run(useCaseInput)
	}

	@Get(':id')
	async getPetById(@Param('id') id: string): Promise<GetPetByIdUsecaseOutput>{
		try {
			const useCaseInput = new GetPetByIdUsecaseInput({id})
		return await this.getPetByIdUseCase.run(useCaseInput)
		} catch (error) {
			throw new BadRequestException(JSON.parse(error.message))
		}
	}

}