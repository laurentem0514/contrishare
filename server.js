'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const logger      = require('morgan');
const path        = require('path');
const techsRoute  = require('./routes/techApi');
const usersRoute  = require('./routes/usersApi');
const projectsRoute  = require('./routes/projectsApi');

// This tests to see if we have NODE_ENV in our environment.
// Only load the dotenv if we need it.
//const isDev = !('NODE_ENV' in process.env) && require('dotenv').config() && true;

const app    = express();
const PORT   = process.argv[2] || process.env.port || 3000;

// set up some logging
app.use(logger('dev'));

// we're only going to accept json
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// bring in the routes
app.use('/api/tech', techsRoute);
app.use('/api/users', usersRoute);
app.use('/api/projects', projectsRoute);
// generic error handler
app.use((err, req, res, next) => {
  console.error(err, next);
  res.status(500).send('Something broke!');
});



// Let's go!
app.listen(PORT);
// app.listen(PORT, () => console.log(Object.keys(process.env).sort(), isDev));
