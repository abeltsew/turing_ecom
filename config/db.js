const mysql = require('mysql')

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sqlpass',
    database: 'turing_ecom'
})

module.exports = connection