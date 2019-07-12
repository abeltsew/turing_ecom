//return db accordingly to enviroment


if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prodDB')
} else {
    module.exports = require('./devDB')
}