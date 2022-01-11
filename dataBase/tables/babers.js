const connection = require('../connect.js');
const Sequelize = require('sequelize')

const barberShops = connection.define('babers', {
    nome: {
        type: Sequelize.STRING
    },
    especialidade: {
        type: Sequelize.STRING
    },
    codigo_barbershop: {
        type: Sequelize.INTEGER
    }
},{
    freezeTableName: true
});

/*barberShops.sync()
    .then( () => {console.log('babers table has been synced');})
    .catch( (err) => {console.log(err)});*/