var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var apiUsers = require('./routes/api/users');
var apiActivity = require('./routes/api/activity');
var apiTopic = require('./routes/api/topic');
var apiComment = require('./routes/api/comment');
var apiSite = require('./routes/api/site');
var apiDynamic = require('./routes/api/dynamic');
var apiWorkType = require('./routes/api/workType');
var apiProject = require('./routes/api/project');
var apiImage = require('./routes/api/image');
var apiAuth = require('./routes/api/auth');


var adminIndex = require('./routes/admin/index');
var adminUsers = require('./routes/admin/users');
var adminDynamic = require('./routes/admin/dynamic');
var adminRequire = require('./routes/admin/require');
var adminWorktype = require('./routes/admin/worktype');
var adminActivity = require('./routes/admin/activity');
var adminTopic = require('./routes/admin/topic');
var adminComment = require('./routes/admin/comment');
//设置跨域
var cors = require('express-cors');
 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 接口设置
app.use('/', routes);
app.use('/users', users);
app.use('/api/users', apiUsers);
app.use('/api/activity', apiActivity);
app.use('/api/topic', apiTopic);
app.use('/api/comment', apiComment);
app.use('/api/site', apiSite);
app.use('/api/dynamic', apiDynamic);
app.use('/api/workType', apiWorkType);
app.use('/api/project', apiProject);
app.use('/api/image', apiImage);
app.use('/api/auth', apiAuth);

// 后台管理设置
app.use('/admin/index', adminIndex); 
app.use('/admin/users', adminUsers);
app.use('/admin/dynamic', adminDynamic);
app.use('/admin/require', adminRequire);
app.use('/admin/worktype', adminWorktype);
app.use('/admin/activity', adminActivity);
app.use('/admin/topic', adminTopic);
app.use('/admin/comment', adminComment);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
