const express = require('express')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json())

require('./routes/productRoutes')(app)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    //if rout not an api

    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('app started on port 5000'))

