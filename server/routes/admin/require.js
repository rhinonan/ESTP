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
      // 二层查询
      workTypeModel.find({}, function(err, worktypes) {
        if(err){
          res.render('error', {});
        }else{
          res.render('require/add',{
            title: 'ESTP 后台管理',
            nav: 'require',
            dir: '../../',
            users: data,
            worktypes : worktypes
          });
        }
      });
    }
  });
});
router.get('/update/:id', function(req, res, next) {
  var requireId = req.params.id;
  UsersModel.find({},function (err, data) {
    if(err){
      res.render('error');
    }else{
      // 二层查询
      workTypeModel.find({}, function(err, worktypes) {
        if(err){
          res.render('error', {});
        }else{
          // 三层查询
          requireModel.findById(requireId, function(err, require) {
            if(err){
              res.render('erroe', {});
            }else{              
              res.render('require/update',{
                title: 'ESTP 后台管理',
                nav: 'require',
                dir: '../../../',
                users: data,
                require: require,
                worktypes : worktypes
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
