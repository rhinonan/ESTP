var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../dbConfig.js');


var UsersModel = mongoose.model('Users');
var DynamicModel = mongoose.model('Dynamic');
var workTypeModel = mongoose.model('WorkType');
var requireModel = mongoose.model('Project');
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send('asdsads');
  requireModel.find({})
  .sort({'_id':-1})
  .exec(function(err, requires) {
    if(err){
      res.render('error',{

      });
    }else{
      res.render('require/index',{
        title: 'ESTP 后台管理',
        nav: 'require',
        requires: requires,
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
      res.render('require/add',{
        title: 'ESTP 后台管理',
        nav: 'require',
        dir: '../../',
        users: data
      });
    }
  });
});
router.get('/update/:id', function(req, res, next) {
  var dynamicId = req.params.id;
  DynamicModel.findById(dynamicId, function(err, dynamic) {
    if(err){
      res.render('error');
    }else{
      // 二层查询
      UsersModel.find({},function (err, data) {
        if(err){
          res.render('error');
        }else{
          res.render('dynamic/update',{
            title: 'ESTP 后台管理',
            nav: 'dynamic',
            dir: '../../../',
            dynamic: dynamic,
            users: data 
          });
        }
      });
    }
  });
});

module.exports = router;
