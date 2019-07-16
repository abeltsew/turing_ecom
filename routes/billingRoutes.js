const keys = require('../config/keys')
const connection = require('../config/dbConnection')

const stripe = require('stripe')(keys.stripeSecretKey)
module.exports = app => {

    app.post('/api/stripe', async (req, res) => {

        const charge = await stripe.charges.create({
            amount: req.body.token.amount,
            currency: 'usd',
            description: 'payment for item $',
            source: req.body.token.token.id
        })

        await connection.query(`call shopping_cart_create_order(${req.body.token.inCartId},${req.body.token.inCustomerId},3,2)`
            , (err, result) => {
                if (err) throw err;
                console.log('saved')

            }).catch(err => {
                console.log("Error:", err);
                res.status(500).send({ error: "Purchase Failed" });
            });

        console.log('---------------------')
        console.log(req.body)
        console.log('---------------------')
    })
}