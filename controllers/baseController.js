var mw = require('../middleware/middleware.js');

module.exports = (app, route, query, actions) => {
  app.get(route, async (req, res, next) => {
    await mw.middleWare(req, res, next, query, actions);
  });

  app.put(route, async (req, res, next) => {
    await mw.middleWare(req, res, next, query, actions);
  });

  app.post(route, async (req, res, next) => {
    await mw.middleWare(req, res, next, query, actions);
  });

  app.delete(`${route}/:hardDelete?`, async (req, res, next) => {
    await mw.middleWare(req, res, next, query, actions);
  });

  // Return middleware.
  return (req, res, next) => {
    next();
  };
};