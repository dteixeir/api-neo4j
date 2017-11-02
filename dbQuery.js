const CONFIG = require('./config.js');
const ENUMS = require('./enums/index.js');

const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver(CONFIG.db.url, neo4j.auth.basic(CONFIG.db.username, CONFIG.db.password));
const session = driver.session();

function getReplacedQuery(query, params) {
  return Object.keys(params).reduce((accum, key) => {
    const re = new RegExp(`#=${key}#`, "g");
    return accum.replace(re, params[ key ]);
  }, query);
}

function filteredProperties(data, requestBody) {
  return data.records.map((record) => {
    // If no Properties passed in, passes back all
    // Else only those listed.
    const requestedProps = requestBody && requestBody.fields ? requestBody.fields : Object.keys(record._fields[ 0 ].properties);
    return requestedProps.reduce((accum, prop) => {
      accum[ prop ] = record._fields[ 0 ].properties[ prop ];
      return accum;
    }, {});
  });
}

module.exports = {
  // is boolean was added so that when fetching primitive data it would not break
  // trying to narrow down properties in filteredProperties
  runQuery: async (query, params, returnType = null) => {
    // console.log({ query, params });
    query = getReplacedQuery(query, params);

    try {
      const queryResult = await session.run(query);

      switch (returnType) {
        case ENUMS.QUERY_TYPE.GET.PRIMITIVE:
          return queryResult.records[ 0 ]._fields[ 0 ];
          break;

        case ENUMS.QUERY_TYPE.GET.SINGLE:
          return queryResult.records[ 0 ]._fields[ 0 ].properties;
          break;

        case ENUMS.QUERY_TYPE.INSERT:
          return queryResult.summary.counters._stats.nodesCreated;
          break;

        default:
          return filteredProperties(queryResult, params);
          break;
      }
    } catch (error) {
      throw (error);
    }
  }
}