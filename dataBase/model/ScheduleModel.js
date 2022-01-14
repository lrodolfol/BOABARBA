const schedule = require('../tables/schedule'); //TABELA SEQUELIZE SCHEDULE
const barberShopModel = require('../tables/barberShops'); //TABELA SEQUELIZE BARBERSHOP

class ScheduleModel {

    constructor({ data, hora, barbershop, cliente }) {
        this.data = data;
        this.hora = hora;
        this.barbershop = barbershop;
        this.cliente = cliente;
    }

    async register() {
        var codBarbershop = await this.selectBaberShop(this.barbershop);
        return schedule.create({
            data_hora: this.data + ' ' + this.hora,
            cliente: this.cliente,
            codigo_barbershop: codBarbershop //NECESSÁRIO FAZER UM SELECT PARA PEGAR O ID DO BARBERSHOP, POIS ESTA VINDO O NOME DELA
        })
            .then(function (success) {
                return 'success';
            })
            .catch(function (err) {
                return err.message;
            });
    }

    async selectBaberShop(nome) {
        var idBaberShop = await barberShopModel.findOne({where: {
            nome: nome
        }});

        if(! idBaberShop) {
            throw new Error('Não foi encontrado a barbearia')
        }

return idBaberShop.id;

    }

}

module.exports = ScheduleModel;