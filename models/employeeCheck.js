const Sequelize = require('sequelize');
const db = require('../util/database');

const EmployeeCheck = db.define('employeecheck', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    employeeId: Sequelize.STRING,
    checkin: Sequelize.DATE,
    checkout: Sequelize.DATE,
    duration: Sequelize.STRING,
    comment: Sequelize.STRING
});

module.exports = EmployeeCheck;