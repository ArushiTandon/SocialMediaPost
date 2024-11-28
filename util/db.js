const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postapp', 'root', 'arushi@mysql', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
