const passport = require('passport');
const passportJWT = require('passport-jwt');

const jwtOptions = require('./jwtOptions')


let JwtStrategy = passportJWT.Strategy;




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