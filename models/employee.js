const Sequelize = require('sequelize');
const db = require('../util/database');

const Employee = db.define('employee', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    firstName: Sequelize.STRING,
    departement: Sequelize.STRING
});

module.exports = Employee;