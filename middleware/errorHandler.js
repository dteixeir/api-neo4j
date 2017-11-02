const CONFIG = require('../config.js');
const ERROR_QUERIES = require('../enums/index.js').QUERIES.ERROR;
var db = require('../dbQuery.js');
// This currently will not work with the neo4j!
// Need to look into creating new nodes for that.
module.exports = {
  error: async (error, userFriendlyError, fileName, status) => {
    try {
      if (db.runQuery && CONFIG.errorLogging) {
        await db.runQuery(ERROR_QUERIES.LOG_ERROR, { error, fileName, status });
      }

      CONFIG.env === 'dev' ? console.log({ [ fileName ]: error }) : error = userFriendlyError;
      return error;

    } catch (error) {
      console.log('Error in Error Handler: ', { [ fileName ]: error })
    }
  }
}
