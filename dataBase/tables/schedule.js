const connection = require('../connect.js');
const Sequelize = require('sequelize')

const schedule = connection.define('schedule', {
    data_hora: {
        type: Sequelize.STRING
    },
    cliente: {
        type: Sequelize.STRING
    },
    codigo_barbershop: {
        type: Sequelize.INTEGER
    }
},{
    freezeTableName: true
});

module.exports = schedule;

/*
schedule.sync()
    .then( () => {console.log('schedule table has been synced');})
    .catch( (err) => {console.log(err)});*/