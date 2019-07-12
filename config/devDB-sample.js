// save this file as devDB.js or remove the -sample from the file name after providing your Database Credentials

const mysql = require('mysql')

let connection = mysql.createConnection({
    host: 'localhost',
    user: '[DBuser Goes here]',
    password: '[password Goes here]',
    database: 't[Database name Goes here]'
})

module.exports = connection
