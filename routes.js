var ENUMS = require('./enums/index.js');

module.exports = {
  // For any resource you wish to utilize as RESTful service utilize the baseController class
  // Otherwise create another controller and configure here.

  '/auth': { controller: require('./controllers/authController'), query: ENUMS.QUERIES.AUTH.AUTHENTICATE, actions: { GET: false, PUT: false, POST: true, DELETE: false } },
  '/auth/register': { controller: require('./controllers/authController'), query: ENUMS.QUERIES.AUTH.REGISTER.CREATE, actions: { GET: false, PUT: false, POST: true, DELETE: false } },

  // 'role': { controller: require('./controllers/baseController'), model: require('./models/role'), actions: { GET: true, PUT: true, POST: true, DELETE: true } },
  // 'user': { controller: require('./controllers/baseController'), model: require('./models/user'), actions: { GET: true, PUT: true, POST: true, DELETE: false } },
  // 'task': { controller: require('./controllers/baseController'), model: require('./models/task'), actions: { GET: true, PUT: true, POST: true, DELETE: false } },

  '/movie/:title': { controller: require('./controllers/baseController'), query: ENUMS.QUERIES.MOVIE.BY_TITLE, actions: { GET: true, PUT: false, POST: false, DELETE: false } },
  '/movie/:title/actor': { controller: require('./controllers/baseController'), query: ENUMS.QUERIES.MOVIE.ACTORS_ACTED_IN, actions: { GET: true, PUT: false, POST: true, DELETE: false } }
};


