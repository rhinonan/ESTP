var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../dbConfig.js');


var UsersModel = mongoose.model('Users');
var workTypeModel = mongoose.model('WorkType');
/* GET home page. */
router.get('/', function(req, res, next) {
  UsersModel.find({})
  .sort({'_id':-1})
  .exec(function(err, users) {
    if(err){
      res.render('error',{

      });
    }else{
      res.render('users/index',{
        title: 'ESTP 后台管理',
        nav: 'users',
        users: users,
        dir: '../'
      });
    }
  });
});
router.get('/add', function(req, res, next) {
  workTypeModel.find({},function (err, data) {
    if(err){
      res.render('error');
    }else{
      res.render('users/add',{
        title: 'ESTP 后台管理',
        nav: 'users',
        dir: '../../',
        worktype: data
      });
    }
  });
});
router.get('/update/:id', function(req, res, next) {
  var userId = req.params.id;
  UsersModel.findById(userId, function(err, user) {
    if(err){
      res.render('error');
    }else{
      // 二层查询
      workTypeModel.find({},function (err, worktype) {
        if(err){
          res.render('error');
        }else{
          res.render('users/update',{
            title: 'ESTP 后台管理',
            nav: 'users',
            dir: '../../../',
            worktype: worktype,
            user: user
          });
        }
      });
    }
  });
});

module.exports = router;
