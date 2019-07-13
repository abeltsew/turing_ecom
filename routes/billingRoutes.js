const keys = require('../config/keys')

const stripe = require('stripe')(keys.stripeSecretKey)
module.exports = app => {
    app.post('/api/stripe', async (req, res) => {

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: 'payment for 5 $',
            source: req.body.id
        })

        console.log(req.body)
    })
}