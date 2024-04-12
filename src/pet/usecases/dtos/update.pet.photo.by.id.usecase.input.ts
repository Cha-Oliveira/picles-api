export default class UpdadePetPhotoByIdUseCaseInput{
    id: string
    photoPatch: string

    constructor(data: Partial<UpdadePetPhotoByIdUseCaseInput>){
        Object.assign(this, data)
    }
}