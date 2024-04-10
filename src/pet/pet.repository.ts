import IPetRepository from "./interfaces/pet.repository.interface";
import { Pet } from "./schemas/pet.schemas";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

export default class PetRepository implements IPetRepository{

    constructor(
        @InjectModel(Pet.name)
        private readonly petModel: Model<Pet>,
    ){}

    async getById(id: string): Promise<Pet> {
        return await this.petModel.findById(id)
    }

    async create(data: Partial<Pet>): Promise<Pet> {
        return await this.petModel.create({
            ...data,
            createdAt: new Date(),
            updateAt: new Date()
        })
    }

    async updateById(data: Partial<Pet>): Promise<void>{
        await this.petModel.updateOne(
            {
            _id: data._id
           }, {
            ...data, 
            updatedAt: new Date()
           }
        )
    }

}


