class NaoEncontrado extends Error {
    constructor(mensagemErro) {
        super(mensagemErro);
        this.message = mensagemErro,
        this.codeError = 1
    }
}