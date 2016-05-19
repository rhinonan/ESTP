var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../dbConfig.js');


var UsersModel = mongoose.model('Users');
var DynamicModel = mongoose.model('Dynamic');
var workTypeModel = mongoose.model('WorkType');
var requireModel = mongoose.model('Project');
var activityModel = mongoose.model('Activity');
var topicModel = mongoose.model('Topic');
var commentModel = mongoose.model('Comment');
/* GET home page. */
router.get('/', function(req, res, next) {
  var p ;
  var user;
  var dynamic;
  var require;
  var activity;
  var comment;
  var topic;
  p = UsersModel.count({});
  p.then(function( data) {
    user = data;
  });
  p = DynamicModel.count({});
  p.then(function( data) {
    dynamic = data;
  });
  p = activityModel.count({});
  p.then(function( data) {
    activity = data;
  });
  p = topicModel.count({});
  p.then(function( data) {
    topic = data;
  });
  p = commentModel.count({});
  p.then(function( data) {
    comment = data;
  });
  p = requireModel.count({});
  p.then(function( data) {
    require = data;
  });
  setTimeout(function() {
    res.render('index',{
      title: 'ESTP 后台管理',
      nav: 'index',
      dir: '../',
      user:user,
      dynamic: dynamic,
      require: require,
      activity: activity,
      comment: comment,
      topic: topic,
    });
  }, 100);
});


module.exports = router;
