import { Module } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import ShelterToken from './shelter.tokens';
import GetShelterDetailsUseCaseOutput from './usecases/dtos/get.shelter.details.usercase.output';
import GetShelterDetailsUseCase from './usecases/get.shelter.details.usecase';
import { Shelter, shelterSchema } from './schemas/shelter.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ShelterRepository } from './shelter.repository';
import UpdateShelterDetailsUseCase from './usecases/update.shelter.datails.usecase';

@Module({
  controllers: [ShelterController],

  imports:[
    MongooseModule.forFeature([{name: Shelter.name, schema: shelterSchema}])
  ],
  providers: [
    {
      provide: ShelterToken.getShelterDetailsUseCase,
      useClass: GetShelterDetailsUseCase
    },
    {
      provide: ShelterToken.shelterRepository,
      useClass: ShelterRepository,
    },
    {
      provide: ShelterToken.updateShelterDetailsUseCase,
      useClass: UpdateShelterDetailsUseCase
    }
  ]
})
export class ShelterModule {}
