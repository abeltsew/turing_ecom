const connection = require('../config/dbConnection')
const passport = require('passport')

//use  passport.authenticate('jwt'{ session: false }) to protect a route

//connection.connect()

module.exports = app => {

    // GET ---list of catagories

    app.get('/api/categories', (req, res) => {
        connection.query('SELECT * FROM category', function (err, rows, fields) {
            if (err) throw err;
            res.send(rows)
        })

    })
    //GET --- list of All Products

    app.get('/api/products', (req, res) => {
        connection.query('SELECT * FROM product', (err, rows, fields) => {
            if (err) throw err;



            res.send(rows)
        })
    })
    //GET --- Specific item by ID


    app.get('/api/products/:product_id', (req, res) => {

        connection.query(`SELECT * FROM product Where product_id = ${req.params.product_id}`, (err, rows, fields) => {
            if (err) throw err;

            res.send(rows[0])
        })
    })


    //GET -- products attributes
    app.get('/api/attributes/inProduct/:product_id', (req, res) => {

        connection.query(`CALL catalog_get_product_attributes(${req.params.product_id})`, (err, rows, fields) => {
            if (err) throw err;

            res.send(rows[0])
        })
    })

    //GET -- List of Departments 
    app.get('/api/departments', (req, res) => {
        connection.query('SELECT * FROM department', (err, rows, fields) => {
            if (err) throw err;



            res.send(rows)
        })
    })

    //GET -- products by category 
    app.get('/api/products/inCategory/:category_id', (req, res) => {

        connection.query(`Call catalog_get_products_in_category(${req.params.category_id},10,100,1)`, (err, rows, fields) => {
            if (err) throw err;

            res.send(rows[0])
        })
    })

    // GET unique ID

    app.get('/api/shoppingcart/generateUniqueId', (req, res) => {

        res.send({ cart_id: new Date().valueOf() })
    })

    // POST - Add A product in the cart

    app.post('/api/shoppingcart/add', (req, res) => {
        const { cart_id, product_id, attributes, quantity } = req.body
        console.log(req.body)
        const added_on = new Date().toISOString().slice(0, 19).replace('T', ' ')

        connection.query(`INSERT INTO shopping_cart (cart_id,product_id,attributes,quantity,added_on) VALUES (${cart_id},${product_id},'${attributes}',${quantity},'${added_on}')`
            , (err, result) => {
                if (err) throw err;
                console.log('saved')
                //try yo send back the completet list of cart
                res.send({ cart_id, product_id, attributes, quantity })

            })



    })
    //GET -- Shoping cart by ID 
    app.get('/api/shoppingcart/:client_id', (req, res) => {

        connection.query(`Call shopping_cart_get_products(${req.params.client_id})`, (err, rows, fields) => {
            if (err) throw err;

            res.send(rows[0])
        })
    })

    // DELETE -- Product from cart
    app.delete('/api/shoppingcart/removeProduct/:item_id', (req, res) => {

        connection.query(`call shopping_cart_remove_product(${req.params.item_id})`, (err, rows, fields) => {
            if (err) throw err;

            res.status(200).send
        })
    })

} //close app exports