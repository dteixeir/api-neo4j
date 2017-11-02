const CONFIG = require('../config.js');
const errorHandler = require('./errorHandler.js');

// This currently will not work with the neo4j!
// Need to look into creating new nodes for that.
module.exports = {
  autoUpdate: async (req, res, tokenInfo) => {
    try {
      switch (req.originalMethod) {
        case 'POST':
          req.body = {
            ...req.body,
            CreatedBy: tokenInfo.username,
            UpdatedBy: tokenInfo.username
          };
          break;

        case 'PUT':
          req.body = {
            ...req.body,
            UpdatedBy: tokenInfo.username
          };
          break;

        case 'DELETE':
          req.body = {
            ...req.body,
            UpdatedBy: tokenInfo.username,
            IsDeleted: true,
            IsActive: false
          };
          break;
      }

      return req;

    } catch (error) {
      res.status(400);
      error = await errorHandler.error(error, 'Bad Request', __filename, res.statusCode);
      res.json({ error });
      throw (error);
    }
  }
}
