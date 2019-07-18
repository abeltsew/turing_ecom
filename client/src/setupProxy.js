const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    // app.use(proxy('/auth/google', { target: 'http://localhost:5000/' }));
    app.use(proxy('/api/*', { target: 'http://localhost:5000/' }));
    app.use(proxy('/api/products/*', { target: 'http://localhost:5000/' }));
    app.use(proxy('/api/attributes/inProduct/*', { target: 'http://localhost:5000/' }));
    app.use(proxy('/api/products/inCategory/*', { target: 'http://localhost:5000/' }));
    app.use(proxy('/api/shoppingcart/*', { target: 'http://localhost:5000/' }));
    app.use(proxy('/api/categories/inDepartment/*', { target: 'http://localhost:5000/' }));
    app.use(proxy('/api/shoppingcart/removeProduct/*', { target: 'http://localhost:5000/' }));
    app.use(proxy('/api/shoppingcart/totalAmount/*', { target: 'http://localhost:5000/' }));
    app.use(proxy('/api/order/*', { target: 'http://localhost:5000/' }));
};