// package puts all requests through the middleware in order
// make applying all middleware to end points easy.

const auth = require('./auth.js');
var autoUpdate = require('./autoUpdate.js');
const resource = require('./resource.js');
// const response = require('./response.js');
const CONFIG = require('../config.js');

module.exports = {
  middleWare: async (req, res, next, query, actions) => {
    try {
      // Authenticate
      const tokenInfo = await auth.verify(req, res);

      // other middleware
      req = await autoUpdate.autoUpdate(req, res, tokenInfo);         // (Not Implemented Yet) House Keeping properties maintained
      let result = await resource.resource(req, res, query, actions);           // Act upon db request
      // result = await response.response(req, res, result);                    // (Not Implemented Yet) Handle clean REST API Responses
      res.json(result).status(200).send();
    } catch (error) {
      // returns error decided in middleware files
      res.send();
    }
  }
}
