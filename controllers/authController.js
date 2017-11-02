const CONFIG = require('../config.js');
const ENUMS = require('../enums/index.js');

const jwt = require('jsonwebtoken');
const db = require('../dbQuery.js');
const errorHandler = require('../middleware/errorHandler.js');
const bcrypt = require('bcryptjs');

// The Auth controller did not have its own set of middleware so just rethrowing the error did nothing other than 
// bubble it up with nothing addressing it. Which caused the unhandled error warning when the Neo4j connection was
// not set yet. WATCH OUT FOR THIS!
module.exports = (app, route, query, actions) => {
  // authenticate current user
  app.post('/auth', async (req, res, next) => {
    try {
      // attempt to get user by username
      const user = await db.runQuery(ENUMS.QUERIES.AUTH.AUTHENTICATE, req.body, ENUMS.QUERY_TYPE.GET.SINGLE);
      //if (!!!user) return res.status(400).send({ error: 'Login Failed' });
      if (!!!user) throw ('Login Failed');

      // is correct login
      if (!await bcrypt.compareSync(req.body.password, user.password)) throw ('Login Failed');
      return res.status(200).send({ token: await jwt.sign({ username: user.username }, CONFIG.secret, { expiresIn: '5h' }) });

      // fall through login fail catch
      // return res.status(400).send({ error: 'Login Failed' });
      throw ('Login Failed');

    } catch (error) {
      res.status(401);
      error = await errorHandler.error(error, 'Login Failed', __filename, res.statusCode);
      res.json({ error });
      res.send();
    }
  });

  // register new user
  app.post('/auth/register', async (req, res, next) => {
    try {
      // check for duplicate username
      const isDuplicateUsername = await db.runQuery(ENUMS.QUERIES.AUTH.REGISTER.CHECK_USERNAME, req.body, ENUMS.UERY_TYPE.GET.PRIMITIVE);
      if (isDuplicateUsername) throw ('Duplicate Username');

      // hash inbound password
      if (!(req && req.body && req.body.password)) throw ('No Password Provided');
      req.body.password = await bcrypt.hashSync(req.body.password, CONFIG.encrption.salt);

      // create record
      const created = await db.runQuery(ENUMS.QUERIES.AUTH.REGISTER.CREATE, req.body, ENUMS.QUERY_TYPE.INSERT);
      return res.status(200).send({ created });

    } catch (error) {
      res.status(409);
      error = await errorHandler.error(error, 'Duplicate Username', __filename, res.statusCode);
      res.json({ error });
      res.send();
    }
  });

  // Return middleware.
  return (req, res, next) => {
    next();
  };
};