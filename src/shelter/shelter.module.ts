import { Module } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import ShelterToken from './shelter.token';
import GetShelterDetailsUseCaseOutput from './usecases/dtos/get.shelter.details.usercase.output';
import GetShelterDetailsUseCase from './usecases/get.shelter.details.usecase';
import { Shelter, shelterSchema } from './schemas/shelter.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ShelterController],

  imports:[
    MongooseModule.forFeature([{name: Shelter.name, schema: shelterSchema}])
  ],
  providers: [
    {
      provide: ShelterToken.getShelterDetailsUseCase,
      useClass: GetShelterDetailsUseCase
    }
  ]
})
export class ShelterModule {}
