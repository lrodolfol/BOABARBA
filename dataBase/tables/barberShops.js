const connection = require('../connect.js');
const Sequelize = require('sequelize');

const barberShops = connection.define('babershops', {
    nome: {
        type: Sequelize.STRING
    }
},{
    freezeTableName: true
});

barberShops.sync()
    .then( () => {console.log('babershop table has been synced');})
    .catch( (err) => {console.log(err)});