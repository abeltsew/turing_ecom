const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    // app.use(proxy('/auth/google', { target: 'http://localhost:5000/' }));
    app.use(proxy('/api/*', { target: 'http://localhost:5000/' }));
    app.use(proxy('/api/products/*', { target: 'http://localhost:5000/' }));
    app.use(proxy('/api/productsAttribute/*', { target: 'http://localhost:5000/' }));
    app.use(proxy('/api/productbycategory/*', { target: 'http://localhost:5000/' }));
};