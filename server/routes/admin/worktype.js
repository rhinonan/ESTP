var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../dbConfig.js');


// var UsersModel = mongoose.model('Users');
var workTypeModel = mongoose.model('WorkType');
/* GET home page. */
router.get('/', function(req, res, next) {
  workTypeModel.find({})
  .sort({'_id':-1})
  .exec(function(err, worktypes) {
    if(err){
      res.render('error',{

      });
    }else{
      res.render('worktype/index',{
        title: 'ESTP 后台管理',
        nav: 'worktype',
        worktypes: worktypes,
        dir: '../'
      });
    }
  });
});
router.get('/add', function(req, res, next) {
  res.render('worktype/add',{
    title: 'ESTP 后台管理',
    nav: 'worktype',
    dir: '../../'
  });

});
router.get('/update/:id', function(req, res, next) {
  var worktypeId = req.params.id;
  workTypeModel.findById(worktypeId, function(err, worktype) {
    if(err){
      res.render('error',{});
    }else{
      res.render('worktype/update',{
        title: 'ESTP 后台管理',
        nav: 'worktype',
        worktype: worktype,
        dir: '../../../'
      });
    }
  });
  // UsersModel.findById(userId, function(err, user) {
  //   if(err){
  //     res.render('error');
  //   }else{
  //     // 二层查询
  //     workTypeModel.find({},function (err, worktype) {
  //       if(err){
  //         res.render('error');
  //       }else{
  //         res.render('users/update',{
  //           title: 'ESTP 后台管理',
  //           nav: 'users',
  //           dir: '../../../',
  //           worktype: worktype,
  //           user: user
  //         });
  //       }
  //     });
  //   }
  // });
});

module.exports = router;
