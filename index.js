const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Load the routes.
var routes = require('./routes');

Object.keys(routes).map((route, routeConfig) => {
  app.use(route, routes[ route ].controller(app, route, routes[ route ].query, routes[ route ].actions));
});

app.listen(3000);
console.log('listening on: http://localhost:3000/');

module.exports = app;