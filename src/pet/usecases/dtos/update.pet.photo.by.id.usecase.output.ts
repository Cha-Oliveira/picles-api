import CreatePetUseCaseOutput from "src/pet/dtos/Create.Pet.controller.output";
import UpdatePetByIdUseCaseOutput from "./update.pet.by.id.usecase.output";

export default class UpdatePetPhotoByIdUseCaseOutput extends UpdatePetByIdUseCaseOutput {
  constructor(data: Partial<UpdatePetPhotoByIdUseCaseOutput>) {
    super(data);
    Object.assign(this, data);
  }
}