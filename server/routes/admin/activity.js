var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../dbConfig.js');


var UsersModel = mongoose.model('Users');
var DynamicModel = mongoose.model('Dynamic');
var workTypeModel = mongoose.model('WorkType');
var requireModel = mongoose.model('Project');
var activityModel = mongoose.model('Activity');
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send('asdsads');
  activityModel.find({})
  .sort({'_id':-1})
  .lean()
  .exec(function(err, activities) {
    if(err){
      res.render('error',{

      });
    }else{
      for( var key in activities){
        activities[key].holdDate = activities[key].holdDate.toLocaleString();
      }
      res.render('activity/index',{
        title: 'ESTP 后台管理',
        nav: 'activity',
        activities: activities,
        dir: '../'
      });
    }
  });
});
router.get('/add', function(req, res, next) {
  UsersModel.find({},function (err, data) {
    if(err){
      res.render('error');
    }else{
      res.render('activity/add',{
        title: 'ESTP 后台管理',
        nav: 'activity',
        users: data,
        // activities: activities,
        dir: '../../'
      });
    }
  });
});
router.get('/update/:id', function(req, res, next) {
  var activityId = req.params.id;
  UsersModel.find({},function (err, data) {
    if(err){
      res.render('error');
    }else{
      // 二层查询
      activityModel.findById(activityId)
      .lean()
      .exec(function(err, activity) {
        if(err){
          res.render('erroe', {});
        }else{
          activity.holdDate = activity.holdDate.toLocaleString().split(' ')[0];          
          res.render('activity/update',{
            title: 'ESTP 后台管理',
            nav: 'activity',
            dir: '../../../',
            users: data,
            activity: activity,
          });
        }
      });
    }
  });
});

module.exports = router;
