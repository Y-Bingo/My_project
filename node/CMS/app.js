var mongodb = require('./config/mongoose');
var express = require('./config/express');

var db  = mongodb();
var app = express();

module.exports = app;