const schedule = require('../tables/schedule'); //TABELA SEQUELIZE SCHEDULE
const barberShopModel = require('../tables/barberShops'); //TABELA SEQUELIZE BARBERSHOP

class ScheduleModel {

    constructor({ data, hora, barbershop, cliente, id }) {
        this.data = data;
        this.hora = hora;
        this.barbershop = barbershop;
        this.cliente = cliente;
        this.id = id;
    }

    async register() {
        var codBarbershop = await this.selectBaberShop(this.barbershop);
        const resultShedule = await schedule.create({
            data_hora: this.data + ' ' + this.hora,
            cliente: this.cliente,
            codigo_barbershop: codBarbershop //NECESSÁRIO FAZER UM SELECT PARA PEGAR O ID DO BARBERSHOP, POIS ESTA VINDO O NOME DELA
        })
        /* .then(function (success) {
             return 'success';
         })
         .catch(function (err) {
             return err.message;
         });*/
        this.id = resultShedule.id;

    }

    async selectBaberShop(nome) {
        var idBaberShop = await barberShopModel.findOne({
            where: {
                nome: nome
            }
        });

        if (!idBaberShop) {
            throw new Error('Não foi encontrado a barbearia');
        }

        return idBaberShop.id;

    }

    async selectSheduleById() {
        var dadoSchedule = await schedule.findOne({
            where: {
                id: this.id
            },
            raw: true
        });

        if (!dadoSchedule) {
            throw new Error('Nenhum horário marcado com esse código');
        }

        return dadoSchedule;
    }

}

module.exports = ScheduleModel;