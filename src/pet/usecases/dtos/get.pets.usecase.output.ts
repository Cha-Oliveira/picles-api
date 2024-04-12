export default class GetPetUseCaseOutput {
    currentPage: number
    totalPage: number
    itens: number


    constructor(data: Partial<GetPetUseCaseOutput>) {
        Object.assign(this, data);
      }
}