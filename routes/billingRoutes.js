const keys = require('../config/keys')
const connection = require('../config/dbConnection')

const stripe = require('stripe')(keys.stripeSecretKey)//('sk_test_lomdOfxbm7QDgZWvR82UhV6D')
module.exports = app => {

    app.post('/api/stripe', async (req, res) => {

        const charge = await stripe.charges.create({
            amount: req.body.token.amount,
            currency: 'usd',
            description: `payment for order ID ${req.body.token.inOrderID}`,
            source: req.body.token.token.id,
            metadata: { 'order_id': req.body.token.inOrderID }
        })

        //update status 
        await connection.query(`call orders_update_status(${req.body.token.inOrderID},2)`
            , (err, result) => {
                if (err) { console.log(err) }
                console.log('Updated ')

            })
        res.send({
            orderID: req.body.token.inOrderID
        })


        console.log('---------------------')
        console.log(req.body)
        console.log('---------------------')
    })
}