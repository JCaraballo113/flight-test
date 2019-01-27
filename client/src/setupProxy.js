const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(proxy("/flights", { target: "http://localhost:5000/" }));
  app.use(proxy("/book", { target: "http://localhost:5000/" }));
};