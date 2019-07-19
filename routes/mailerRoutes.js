const transporter = require('../services/transporter')
module.exports = app => {

    app.post('/api/send', (req, res, next) => {
        var name = req.body.name
        var email = req.body.email
        var message = req.body.message
        console.log(message)

        var mail = {
            from: "Turing Tshirt",
            to: email,
            subject: 'Thank you for your purchase',
            text: message,
            html: message
        }

        transporter.sendMail(mail, (err, data) => {
            if (err) {
                res.json({
                    msg: 'fail'
                })
                console.log('failed')
            } else {
                res.json({
                    msg: 'success'
                })
                console.log('success')
            }
        })
    })
}