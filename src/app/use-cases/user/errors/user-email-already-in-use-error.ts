export class UserEmailAlreadyInUse extends Error {
    constructor() {
        super('Este email de usuário já está em uso.')
    }
}