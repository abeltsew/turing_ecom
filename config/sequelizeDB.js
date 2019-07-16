const Sequelize = require('sequelize');

if (process.env.NODE_ENV === 'production') {
    const sequelize = new Sequelize(process.env.CLEARDB_JADE_URL);
    module.exports = sequelize
} else {
    const sequelize = new Sequelize({
        database: 'turing_ecom',
        username: 'root',
        password: 'sqlpass',
        dialect: 'mysql',
    });
    module.exports = sequelize
}


// {
//     database: process.env.DB_NAME,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     dialect: 'mysql',
// }