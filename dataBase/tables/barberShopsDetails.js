const connection = require('../connect.js');
const Sequelize = require('sequelize')

const barbershopsDetails = connection.define('barbershops_details', {
    descricao: {
        type: Sequelize.STRING
    },
    valor: {
        type: Sequelize.FLOAT
    },
    tempo: {
        type: Sequelize.INTEGER
    },
    codigo_barber_shops: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true
});

/*barbershopsDetails.sync()
    .then( () => {console.log('babershopsDetails table has been synced');})
    .catch( (err) => {console.log(err)});*/