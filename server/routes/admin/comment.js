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
  commentModel.find({})
  .sort({'_id':-1})
  .exec(function(err, comments) {
    if(err){
      res.render('error',{

      });
    }else{
      res.render('comment/index',{
        title: 'ESTP 后台管理',
        nav: 'comment',
        comments: comments,
        // activities: activities,
        dir: '../'
      });
    }
  });
});


module.exports = router;
