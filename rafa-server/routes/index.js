const express = require('express');
const app = express();

app.use(require('./records'))

module.exports = app;
