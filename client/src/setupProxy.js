const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/graphql',  // Change this path to match the endpoint of your Apollo Server
    createProxyMiddleware({
      target: 'http://localhost:3005/graphql',
      changeOrigin: true,
    })
  );
};
