const connection = require('../config/dbConnection')

connection.connect()

module.exports = app => {

    // GET ---list of catagories

    app.get('/api/catagories', (req, res) => {
        connection.query('SELECT * FROM category', function (err, rows, fields) {
            if (err) {
                console.log(err)
            }
            res.send(rows)
        })

    })
    //GET --- list of All Products

    app.get('/api/products', (req, res) => {
        connection.query('SELECT * FROM product', (err, rows, fields) => {
            if (err) {
                console.log(err)
            }



            res.send(rows)
        })
    })
    //GET --- Specific item by ID


    app.get('/api/products/:id', (req, res) => {

        connection.query(`SELECT * FROM product Where product_id = ${req.params.id}`, (err, rows, fields) => {
            if (err) {
                console.log(err)
            }

            res.send(rows[0])
        })
    })


    //GET -- products attributes
    app.get('/api/productsAttribute/:id', (req, res) => {

        connection.query(`CALL catalog_get_product_attributes(${req.params.id})`, (err, rows, fields) => {
            if (err) {
                console.log(err)
            }

            res.send(rows[0])
        })
    })

    //GET -- List of Departments 
    app.get('/api/departments', (req, res) => {
        connection.query('SELECT * FROM department', (err, rows, fields) => {
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