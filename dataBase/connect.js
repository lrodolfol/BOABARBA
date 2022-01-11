const config = require('config'); //arquivo de config na raiz/config/default.json
const Sequelize = require('sequelize'); //ORM databse

const sequelize = new Sequelize(
    config.get('mysql.database'),
    config.get('mysql.username'),
    config.get('mysql.password'),
    {
        host: config.get('mysql.host'),
        dialect: config.get('mysql.dialect')
    }
);

module.exports = sequelize;