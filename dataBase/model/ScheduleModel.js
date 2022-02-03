const schedule = require('../tables/schedule'); //TABELA SEQUELIZE SCHEDULE
const barberShopModel = require('../tables/barberShops'); //TABELA SEQUELIZE BARBERSHOP
const DadosInvalidos = require('../../useClass/errorClass/DadosInvalidos.js');
const moment = require('moment');

class ScheduleModel {

    constructor({ data, hora, barbershop, cliente, id }) {
        this.data = data;
        this.hora = hora;
        this.barbershop = barbershop;
        this.cliente = cliente;
        this.id = id;
        this.msgError = '';
    }

    async register() {
        this.validate();

        var codBarbershop = await this.selectBaberShop(this.barbershop);

        if(await this.consulterSchedule(codBarbershop) ){
            console.log('Schedule is already in use');
            this.msgError = 'Schedule is already in use';
            return false;
        }
        console.log('Schedule OK');
        const resultShedule = await schedule.create({
            data_hora: this.data + ' ' + this.hora,
            cliente: this.cliente,
            codigo_barbershop: codBarbershop //NECESSÁRIO FAZER UM SELECT PARA PEGAR O ID DO BARBERSHOP, POIS ESTA VINDO O NOME DELA
        })
        this.id = resultShedule.id;

        return true;
    }

    validate() {
        var dadosInvalidos = [];
        var cont = 0;

        if(typeof this.barbershop !== 'string' || this.barbershop.length <= 0) {
            dadosInvalidos[cont] = {
                campo: 'barbearia',
                erro: 'Deve ser string e conter nome da barbearia'
            };
            cont++;
        }
        if(typeof this.cliente !== 'string' || this.cliente.length <= 0) {
            dadosInvalidos[cont] = {
                campo: 'cliente',
                erro: 'Deve ser string e conter nome do cliente'
            }
            cont++;
        }
      

        if(dadosInvalidos.length > 0)  {
            throw new DadosInvalidos('Dados Inválidos para marcar horário', dadosInvalidos);
        }
    }

    async consulterSchedule(codBarbershop) {
        
        const findSchedule = await schedule.findOne({ raw: true,
            where: {
                codigo_barbershop: codBarbershop,
                data_hora: this.data + ' ' + this.hora
            }
        });

        console.log(findSchedule);

        if(findSchedule) {
            return true;
        }
        
        return false;
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