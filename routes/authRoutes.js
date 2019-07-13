const passport = require('passport');
const jwt = require('jsonwebtoken');

const Customer = require('../models/Customer')
const jwtOptions = require('../services/jwtOptions')

module.exports = (app) => {
    // create some helper functions to work on the database
    const createCustomer = async ({ name, email, password }) => {
        return await Customer.create({ name, email, password });
    };

    const getAllCustomers = async () => {
        return await Customer.findAll();
    };

    const getCustomer = async obj => {
        return await Customer.findOne({
            where: obj,
        });
    };

    // get all customers
    app.get('/api/customers', function (req, res) {
        getAllCustomers().then(customer => res.json(customer));
    });

    // register route
    app.post('/api/register', function (req, res, next) {
        const { name, email, password } = req.body;
        createCustomer({ name, email, password }).then(customer =>
            res.json({ customer, msg: 'account created successfully' })
        );
    });

    //login route
    app.post('/api/login', async function (req, res, next) {
        const { email, password } = req.body;
        if (email && password) {
            let customer = await getCustomer({ email });
            if (!customer) {
                res.status(401).json({ message: 'No such customer found' });
            }
            if (customer.password === password) {
                // from now on we'll identify the customer by the id and the id is the 
                // only personalized value that goes into our token
                let payload = { id: customer.id };
                let token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.json({ msg: 'ok', token: token });
            } else {
                res.status(401).json({ msg: 'Password is incorrect' });
            }
        }
    });

    // protected route
    app.get('/api/protected', passport.authenticate('jwt', { session: false }), function (req, res) {
        res.json('Success! You can now see this without a token.');
    });


}