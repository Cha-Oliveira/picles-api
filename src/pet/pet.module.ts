import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import PetTokens from './pet.tokens';
import CreatePetUseCase from './usecases/create.pet.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './schemas/pet.schemas';
import petRepository from './pet.repository';
import GetPetByIdUsecase from './usecases/get.pet.by.id.usecase';
import UpdatePetByIdUseCase from './usecases/update.pet.by.id.usecase';
import DeletePetByIdUseCase from './usecases/delete.pet.by.id.usecase';
import UpdatePetPhotoByIdUseCase from './usecases/update.pet.photo.by.id.usecase';
import AppTokens from 'src/app.tokens';
import FileService from 'src/file.service';
import GetPetsUseCase from './usecases/get.pets.usecase';

@Module({
  controllers: [PetController],
  imports: [MongooseModule.forFeature([{name: Pet.name, schema: PetSchema }])],
  providers:[
	{
		provide: PetTokens.createPetUseCase,
		useClass: CreatePetUseCase
	},
	{
		provide: PetTokens.getPetByIdUseCase,
		useClass: GetPetByIdUsecase 
	},
	{
		provide: PetTokens.petRepository,
		useClass: petRepository
	},
	{
		provide: PetTokens.updatePetByIdUseCase,
		useClass: UpdatePetByIdUseCase
	},
	{
		provide: PetTokens.deletePetByIdUseCase,
		useClass: DeletePetByIdUseCase
	},
	{
		provide: PetTokens.UpdatePetPhotoByIdUseCase,
		useClass: UpdatePetPhotoByIdUseCase
	},
	{
		provide: AppTokens.fileService,
		useClass: FileService
	},
	{
		provide: AppTokens.getPetsUseCase,
		useClass: GetPetsUseCase
	}
	
  ]
})
export class PetModule {}