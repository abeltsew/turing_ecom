const connection = require('../config/db')

connection.connect()

module.exports = app => {

    // GET ---list of catagories

    app.get('/api/catagories', (req, res) => {
        connection.query('SELECT * FROM turing_ecom.category', function (err, rows, fields) {
            if (err) {
                console.log(err)
            }
            res.send(rows)
        })

    })
    //GET --- list of All Products


    app.get('/api/products', (req, res) => {
        connection.query('SELECT * FROM turing_ecom.product', (err, rows, fields) => {
            if (err) {
                console.log(err)
            }



            res.send(rows)
        })
    })
    //GET --- Specific item by ID


    app.get('/api/products/:id', (req, res) => {

        connection.query(`SELECT * FROM turing_ecom.product Where product_id = ${req.params.id}`, (err, rows, fields) => {
            if (err) {
                console.log(err)
            }

            res.send(rows[0])
        })
    })


    //GET -- List of Departments 
    app.get('/api/departments', (req, res) => {
        connection.query('SELECT * FROM turing_ecom.department', (err, rows, fields) => {
            if (err) {
                console.log(err)
            }



            res.send(rows)
        })
    })

    //GET -- products by category 
    app.get('/api/productbycategory/:id', (req, res) => {

        connection.query(`Call catalog_get_products_in_category(${req.params.id},10,100,1)`, (err, rows, fields) => {
            if (err) {
                console.log(err)
            }

            res.send(rows[0])
        })
    })


} //close app exports