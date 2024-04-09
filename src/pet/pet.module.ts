import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import petTokens from './pet.tokens';
import { create } from 'domain';

@Module({
    controllers: [PetController],
    providers:[
        {
            provide: petTokens.createPetUseCase,
            useClass: CreatePetUseCase
        }
    ]
})
export class PetModule {}
