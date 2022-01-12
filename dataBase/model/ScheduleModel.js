const schedule = require('../tables/schedule'); //TABELA SEQUELIZE BARBERSOP

class ScheduleModel {

    constructor({ data, hora, barbershop, cliente }) {
        this.data = data;
        this.hora = hora;
        this.barbershop = barbershop;
        this.cliente = cliente;
    }

    async register(){
        return barberShop.create({nome: this.nome})
         .then(function(success){
             return 'success';
         })
         .catch(function(err){
             return err.message;
         });       
      }

    async register() {
        return schedule.create({
            data_hora: this.data + ' ' + this.hora,
            cliente: this.cliente,
            codigo_barbershop: 1 //NECESSÁRIO FAZER UM SELECT PARA PEGAR O ID DO BARBERSHOP, POIS ESTA VINDO O NOME DELA
        })
            .then(function (success) {
                return 'success';
            })
            .catch(function (err) {
                return err.message;
            });
    }
}

module.exports = ScheduleModel;