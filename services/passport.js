const passport = require('passport');
const passportJWT = require('passport-jwt');

const Customer = require('../models/Customer')

const jwtOptions = require('./jwtOptions')


let JwtStrategy = passportJWT.Strategy;

const getCustomer = async obj => {
    return await Customer.findOne({
        where: obj,
    });
};


let strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    console.log('payload received', jwt_payload);
    let customer = getCustomer({ id: jwt_payload.id });

    if (customer) {
        next(null, customer);
    } else {
        next(null, false);
    }
});


passport.use(strategy);