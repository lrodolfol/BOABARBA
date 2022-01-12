const barberShop = require('../tables/barberShops.js'); //TABELA SEQUELIZE BARBERSOP

class BaberShopsModel {

    constructor({nome}) {
        this.nome = nome;
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
}

module.exports = BaberShopsModel;