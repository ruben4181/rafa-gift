const express = require('express');
const app = express();

app.use(require('./services'));
app.use(require('./users'));
app.use(require('./stats'));
module.exports = app;