import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
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
import DeletePetByIdUseCaseInput from './usecases/dtos/delete.pet.by.id.usecase.input';
import DeletePetByIdUseCaseOutput from './usecases/dtos/delete.pet.by.id.usecase.Output';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from 'src/config/multer.config';
import UpdadePetPhotoByIdUseCaseInput from './usecases/dtos/update.pet.photo.by.id.usecase.input';
import { errorMonitor } from 'events';
import GetPetUseCaseInput from './usecases/dtos/get.pets.usecase.input';
import GetPetUseCaseOutput from './usecases/dtos/get.pets.usecase.output';

@Controller('pet')
export class PetController {

	@Inject(PetTokens.createPetUseCase)
	private readonly createPetUseCase: IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutput>

	@Inject(PetTokens.getPetByIdUseCase)
	private readonly getPetByIdUseCase: IUseCase<GetPetByIdUsecaseInput, GetPetByIdUsecaseOutput>
	
	@Inject(PetTokens.updatePetByIdUseCase)
	private readonly updatePetByIdUseCase: IUseCase<UpdatePetByIdUseCaseInput, UpdatePetByIdUseCaseOutput>

	@Inject(PetTokens.deletePetByIdUseCase)
	private readonly deletePetByIdUseCase: IUseCase<DeletePetByIdUseCaseInput, DeletePetByIdUseCaseOutput>
	
	@Inject(PetTokens.UpdatePetPhotoByIdUseCase)
	private readonly UpdatePetPhotoByIdUseCase: IUseCase<UpdadePetPhotoByIdUseCaseInput, UpdatePetByIdUseCaseOutput>

	@Inject(PetTokens.GetPetsUseCase)
	private readonly getPetsUseCase: IUseCase<GetPetByIdUsecaseInput, GetPetUseCaseOutput>

	@Post()
	async createPet(@Body() input: CreatePetControllerInput): Promise<CreatePetUseCaseOutput>{
		const useCaseInput = new CreatePetUseCaseInput({...input})
		return await this.createPetUseCase.run(useCaseInput)
	}

	@Get()
	async getPets(
		@Query('type') type?: string,
		@Query('size') size?: string,
		@Query('gender') gender?: string,
		@Query('page') page?: string,
		@Query('itemsPerPage') itemsPerPage?: string,
	): Promise<GetPetByIdUsecaseOutput>{
		const FIRST_PAGE = 1
		const DEFAULT_ITENS_PER_PAGE = 10
		const useCaseInput = new GetPetUseCaseInput({
			type: !!type ? type : null,
			size: !!size ? size : null,
			gender: !!gender ? gender : null,
			page: !!page ? parseInt(page) : FIRST_PAGE,
			itemsPerPage: !!itemsPerPage ? parseInt(itemsPerPage) : DEFAULT_ITENS_PER_PAGE

		})

		return await this.getPetsUseCase.run(useCaseInput)
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
		try{
			const useCaseInput = new UpdatePetByIdUseCaseInput({...input, id})
			return await this.updatePetByIdUseCase.run(useCaseInput)
		}catch(error){
			throw new BadRequestException(JSON.parse(error.message))
		}
	}

	@Delete(':id')
	async deletePet(@Param('id')id: string): Promise<DeletePetByIdUseCaseOutput>{
		try {
			const useCaseInput = new DeletePetByIdUseCaseInput({id})
			return await this.deletePetByIdUseCase.run(useCaseInput)
		} catch (error) {
			throw new BadRequestException(JSON.parse(error.message))
		}
	}

	@Patch(':id/photo')
	@UseInterceptors(FileInterceptor('photo', multerConfig))
	async updadePhoto(
	@UploadedFile()photo: Express.Multer.File,
	@Param('id') id: string,
	): Promise<UpdatePetByIdUseCaseOutput>{
		try {
			const useCaseInput = new UpdadePetPhotoByIdUseCaseInput({
				id,
				photoPatch: photo.path
			})

		return await this.UpdatePetPhotoByIdUseCase.run(useCaseInput)

		} catch (error) {
			throw new BadRequestException(JSON.parse(error.message))
		}
	}

}