export class EmailOrPasswordIncorrect extends Error {
    constructor() {
        super('Senha ou email incorretos.');
    }
}