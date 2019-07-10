const connection = require('../config/db')

connection.connect()

module.exports = app => {
    app.get('/api/catagories', (req, res) => {
        connection.query('SELECT * FROM turing_ecom.category', function (err, rows, fields) {
            if (err) {
                console.log(err)
            }
            res.send(rows)
        })

    })

    app.get('/api/products', (req, res) => {
        connection.query('SELECT * FROM turing_ecom.product', (err, rows, fields) => {
            if (err) {
                console.log(err)
            }



            res.send(rows)
        })
    })

    app.get('/api/products/:id', (req, res) => {

        connection.query(`SELECT * FROM turing_ecom.product Where product_id = ${req.params.id}`, (err, rows, fields) => {
            if (err) {
                console.log(err)
            }

            res.send(rows)
        })
    })
}