const barberShop = require('../tables/barberShops.js'); //TABELA SEQUELIZE BARBERSOP
const DadosInvalidos = require('../../useClass/errorClass/DadosInvalidos.js');

class BaberShopsModel {

    constructor({ nome }) {
        this.nome = nome;
    }

    validate() {
        if (typeof this.nome !== 'string' || this.nome.length <= 0) {
            throw new DadosInvalidos('Dados inválido', 'nome');
        }
    }

    async register() {
        this.validate();
        return barberShop.create({ nome: this.nome })
            .then(function (success) {
                return 'success';
            })
            .catch(function (err) {
                return err.message;
            });
    }
}

module.exports = BaberShopsModel;