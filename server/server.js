var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var api = require('./routes/api');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var User = require('./models/user');

mongoose.connect(config.database);
app.set('mostSecret', config.secret);

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  }
  
  // view engine setup
app.set('views', '../spaapp/dist/');
app.set('view engine', 'ejs');
app.options("*", function(req, res, next) {
  var headers = {};
  headers["Access-Control-Allow-Origin"] = "*";
  headers["Allow"] = "POST, GET, PUT, DELETE, OPTIONS";
  headers["Access-Control-Allow-Credentials"] = true;
  headers["Access-Control-Max-Age"] = '86400'; // 24 hours
  headers["Access-Control-Allow-Headers"] = "cache-control, x-requested-with, x-access-token";
  res.writeHead(200, headers);
  res.end();
});
app.engine('html', require('ejs').renderFile);
app.use(allowCrossDomain);
app.use(express.static('public/static/'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', api);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
var server = app.listen(8082, function() {
  var host = 'localhost';
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
module.exports = app;
