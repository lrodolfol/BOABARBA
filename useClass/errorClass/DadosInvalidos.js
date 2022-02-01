class DadosInvalidos extends Error {
    constructor(mensagemErro, campos) {
        super(mensagemErro);
        this.message = mensagemErro,
        this.codeError = 1

        this.camposInvalidos = campos;
    }
}

module.exports = DadosInvalidos;