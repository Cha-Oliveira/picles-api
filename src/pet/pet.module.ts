import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import PetTokens from './pet.tokens';
import CreatePetUseCase from './usecases/create.pet.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './schemas/pet.schemas';
import petRepository from './pet.repository';
import GetPetByIdUsecase from './usecases/get.pet.by.id.usecase';

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
	}
	
  ]
})
export class PetModule {}