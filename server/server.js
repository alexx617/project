global.log = console.log;
const express = require('express');
const bodyParser = require('body-parser');
const config = require('config-lite')(__dirname);
const routes = require('./routes/index');
const logger = require('morgan');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/', routes)
app.use(function (req, res, next) {
    var err = new Error('This page not found');
    err.status = 404;
    next(err)
})
app.listen(3001, function () {
    console.log(`listen ${config.port}`);
})
