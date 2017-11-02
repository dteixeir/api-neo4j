var bcrypt = require('bcryptjs');

module.exports = {
  'secret': '*',
  'db': {
    url: 'bolt://localhost',
    username: '*',
    password: '*'
  },
  'env': process.env.NODE_ENV || 'dev',
  'errorLogging': false,
  'encrption': {
    'salt': bcrypt.genSaltSync(10)
  }
}