// create customer model
const Sequelize = require('sequelize');



// initialze an instance of Sequelize
const sequelize = require('../config/sequelizeDB')


// check the databse connection
sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));


const Customer = sequelize.define('customer', {
    customer_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
}, { freezeTableName: true, tableName: 'customer', timestamps: false });


module.exports = Customer