const stringResource = require('../stringResource.js');
const QUERIES = require('../enums/queryEnum.js');
const CONFIG = require('../config.js');
const db = require('../dbQuery.js');

module.exports = {
  resource: async (req, res, query, actions) => {
    try {
      var result = {};

      // short circut any endpoint actions not allowed by controller actions
      if (!actions[ req.method ]) throw stringResource.error[ 400 ].httpRequestNotAllowed;
      switch (req.method) {
        case 'GET':
          if (req.params) {
            return await db.runQuery(query, req.params);
          }
          break;

        case 'PUT': // ???
          // result = await collection.findOneAndUpdate({ _id: new ObjectID(req.params.id) }, req.body, { new: true }).populate(populate);
          break;

        case 'POST': // ???
          break;

        case 'DELETE': // ???
          // utilize extra optional param to soft delete || hard delete
          // potentially put in logic to further restrict hard delete?
          // if (req.params.hardDelete) {
          //   result = await collection.findByIdAndRemove({ _id: new ObjectID(req.params.id) });
          // } else {
          //   result = await collection.findOneAndUpdate({ _id: new ObjectID(req.params.id) }, req.body, { new: true }).populate(populate);
          // }
          break;
      }

      // if (_.isEmpty(result)) throw stringResource.error[ 400 ].resourceFailed;
      // return result;

    } catch (error) {
      res.status(500);
      error = await errorHandler.error(error, 'Service Unavailable', __filename, res.statusCode);
      res.json({ error });
      throw (error);
    }
  }
}

