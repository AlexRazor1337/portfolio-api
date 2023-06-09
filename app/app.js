const express = require('express');

const { errorHandler } = require('./middleware');
const routes = require('./routes');

const app = express();
app.use(express.json());

app.use(routes);
app.use(errorHandler);
app.use('/images', express.static('images'))

module.exports = app;
