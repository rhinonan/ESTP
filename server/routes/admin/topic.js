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
/* GET home page. */
router.get('/', function(req, res, next) {
  topicModel.find({})
  .sort({'_id':-1})
  .exec(function(err, topics) {
    if(err){
      res.render('error',{

      });
    }else{
      res.render('topic/index',{
        title: 'ESTP 后台管理',
        nav: 'topic',
        topics: topics,
        // activities: activities,
        dir: '../'
      });
    }
  });
});
router.get('/add', function(req, res, next) {
  UsersModel.find({}, function(err, users) {
    if(err){
      res.render('error',{});
    }else{
      res.render('topic/add',{
        title: 'ESTP 后台管理',
        nav: 'topic',
        users: users,
        dir: '../../'
      });
    }
  });
});
router.get('/update/:id', function(req, res, next) {
  var topicId = req.params.id;
  UsersModel.find({},function (err, data) {
    if(err){
      res.render('error');
    }else{
      // 二层查询
      topicModel.findById(topicId)
      .exec(function(err, topic) {
        if(err){
          res.render('erroe', {});
        }else{     
          res.render('topic/update',{
            title: 'ESTP 后台管理',
            nav: 'topic',
            dir: '../../../',
            users: data,
            topic: topic,
          });
        }
      });
    }
  });
});

module.exports = router;
