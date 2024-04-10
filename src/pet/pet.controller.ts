import { BadRequestException, Body, Controller, Get, Inject, Param, Post, Put } from '@nestjs/common';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import { IUseCase } from 'src/domain/iusecase.interface';
import CreatePetUseCaseInput from './usecases/dtos/create.pet.usecase.input';
import PetTokens from './pet.tokens';
import CreatePetUseCaseOutput from './usecases/dtos/create.pet.usecase.output';
import GetPetByIdUsecaseInput from './dtos/get.pet.by.id.usecase.input';
import GetPetByIdUsecaseOutput from './dtos/get.pet.by.id.usecase.output';
import { json } from 'stream/consumers';
import UpdatePetControllerInput from './dtos/update.pet.controller.input';
import UpdatePetByIdUseCaseInput from './usecases/dtos/update.pet.by.id.usecase.input';
import UpdatePetByIdUseCaseOutput from './usecases/dtos/update.pet.by.id.usecase.output';
import UpdateShelterDetailsUseCaseInput from 'src/shelter/usecases/dtos/update.shelter.details.usecase.input';
import UpdatePetByIdUseCase from './usecases/update.pet.by.id.usecase';

@Controller('pet')
export class PetController {

	@Inject(PetTokens.createPetUseCase)
	private readonly createPetUseCase: IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutput>

	@Inject(PetTokens.getPetByIdUseCase)
	private readonly getPetByIdUseCase: IUseCase<GetPetByIdUsecaseInput, GetPetByIdUsecaseOutput>
	
	@Inject(PetTokens.updatePetByIdUseCase)
	private readonly updatePetByIdUseCase: IUseCase<UpdatePetByIdUseCaseInput, UpdatePetByIdUseCaseOutput>

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

	@Put(':id')
	async updatePet(@Body() input: UpdatePetControllerInput, @Param('id') id: string): Promise<UpdatePetByIdUseCaseOutput> {
		const useCaseInput = new UpdatePetByIdUseCaseInput({...input, id})
		return await this.updatePetByIdUseCase.run(useCaseInput)
		
	
	}
}