var jwt = require('jsonwebtoken');
var CONFIG = require('../config.js');
var stringResource = require('../stringResource.js');
const errorHandler = require('./errorHandler.js');

module.exports = {
  verify: async (req, res) => {
    var token = req.headers[ 'authorization' ];

    try {
      // No Token Throw error!
      if (!token) throw (stringResource.error[ 401 ]);

      // Verify Token
      await jwt.verify(token, CONFIG.secret);
      return await jwt.decode(token);

    } catch (error) {
      res.status(401);
      error = await errorHandler.error(error, 'Authentication Failed!', __filename, res.statusCode);
      res.json({ error });
      throw (error);
    }
  }
}
