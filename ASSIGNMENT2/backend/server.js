const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const HttpError = require('./utils/http-error');

const app = express();
app.use(bodyParser.json());

app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  next();
});

app.use('/api', routes); 

app.use((request, response, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, request, response, next) => {
  if (response.headerSent) {
    return next(error);
  }
  response.status(error.code || 500)
  response.json({message: error.message || 'An unknown error occurred!'});
});

mongoose
  .connect('mongodb+srv://salssubs:salssubs@cluster0.qsldf.mongodb.net/salssubs?retryWrites=true&w=majority')
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });