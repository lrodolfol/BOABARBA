const connection = require('../connect.js');
const Sequelize = require('sequelize');

const barberShops = connection.define('barbershops', {
    nome: {
        type: Sequelize.STRING
    }
},{
    freezeTableName: true
});

module.exports = barberShops;

/*barberShops.sync()
    .then( () => {console.log('babershop table has been synced');})
    .catch( (err) => {console.log(err)});*/