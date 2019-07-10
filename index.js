const express = require('express')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json())

require('./routes/productRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('app started on port 5000'))

