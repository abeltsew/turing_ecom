var nodemailer = require('nodemailer');
const creds = require('../config/keys');

var transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: creds.email,
        pass: creds.emailPassword
    }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

module.exports = transporter