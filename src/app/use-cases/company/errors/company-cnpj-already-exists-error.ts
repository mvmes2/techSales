export class CompanyAlreadyExists extends Error {
    constructor() {
        super('Esse cnpj de empresa já está em uso.')
    }
}