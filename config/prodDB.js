//connection to Production DB

const mysql = require('mysql')

let connection = mysql.createConnection(process.env.CLEARDB_JADE_URL)

module.exports = connection


// let connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// })

// module.exports = connection