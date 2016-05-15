var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../dbConfig.js');

var UsersModel = mongoose.model('Users');
// 获取用户信息
router.get('/', function(req, res, next) {
  var type;
  var username;
  var userId;
  var page;
  var pageNum;
  type = req.query.type;
  switch(type){
    case 'id': 
      /**
       * 查询单条用户信息
       * @type {[type]}
       */
      userId = req.query.userId;
      UsersModel.findById(userId, function (err, user) {
        if(err || !user){
          res.json({
            suceess: false,
            msg: '查询用户信息失败',
          });
          // res.status(404);
        }else{
          user.password = null;
          res.json({
            success: true,
            data: user
          });
        }
      });
      break;    
    case 'username': 
      /**
       * 查询多条用户信息
       * @type {[type]}
       */
      username = req.query.username;
      UsersModel.findOne({
        username: username
      }, function (err, user) {
        if(err || !user){
          res.status(404);
          res.json({
            suceess: false,
            msg: '查询用户信息失败',
          });
        }else{
          delete user.password;
          res.json({
            success: true,
            data: user
          });
        }
      });
      break;
    case 'multi':
      /**
       * 查询多个用户信息
       */
      page = req.query.page || 0;
      pageNum = req.query.pageNum || 10;
      UsersModel.find({})
      .skip(page * pageNum)
      .limit(pageNum)
      .exec(function (err, users) {
        if(err){
          res.status(404);
          res.json({
            success: false,
            msg: '查询失败'
          });
        }else{
          res.json({
            success: true,
            data: users
          });
        }
      });
      break;
    default:
      res.status(404);
      res.json({
        success: false,
        msg: '参数错误'
      });
    break;
  }
});

/**
 * 新增用户， 修改用户信息， 修改用户密码 , 用户登录
 * @param  {[type]} req   [description]
 */
router.post('/', function (req, res, next) {
  var type = req.body.type;
  var userId;
  var username;
  var newUser;
  var newUserModel;
  /**
   * 新增用户
   * @param  {json} type json
   * @return {}      
   */
  switch(type){
    case 'add':
      newUser = {
        user: req.body.user,
        username: req.body.username,
        password : req.body.password,
        tel: req.body.tel,
        email: req.body.email,
        data: new Date()
      };
      newUserModel = new UsersModel(newUser);
      newUserModel.save(function (err) {
        if(err) {
          res.json({
            success: false,
            msg: err
          });
        }else{
          res.json({
            success: true,
            msg: '新增用户成功'
          });
        }
      });
    break;
    case 'update': 
      /**
       * 修改用户基本信息
       * @type {[type]}
       */
      userId = req.body.userId;
      UsersModel.findById(userId, function (err, user) {
        if(!user){
          res.status(404);
          res.json({
            success: false,
            msg: '未上传用户id'
          });
          return false;
        }
        user.user = req.body.user;
        user.tel = req.body.tel;
        user.email = req.body.email;
        user.worktype = req.body.workType;
        user.save(function (err) {
          if(err){
            res.status(404);
            res.json({
              success: false,
              msg: '更新用户信息失败'
            });
          }else{
            res.json({
              success: true,
              msg: '更新用户信息成功'
            });
          }
        });
      });
    break;
    case 'password':
      /**
       * 修改用户密码
       * @type {[type]}
       */
      userId = req.body.userId;
      UsersModel.findById(userId, function (err, user) {
        if(user.password == req.body.oldPwd){
          user.password = req.body.newPwd;
          user.save(function (err) {
          if(err){
            res.status(404);
            res.json({
              success: false,
              msg: '修改失败'
            });
          }else{
            res.json({
              success: true,
              msg: '修改密码成功'
            });
          }
        });
        }else{
          res.status(404);
          res.json({
            success: false,
            msg: '原密码错误'
          });
        }
      });
    break;
    case 'login':
      /**
       * 用户登录
       */
      username = req.body.username;
      UsersModel.findOne({
        username: username
      }, function (err, user) {
        if(!user){
          res.json({
            success: false,
            msg:'用户名错误'
          });
          return false;
        }
        if(user.password === req.body.password){
          res.json({
            success: true,
            msg: '登录成功'
          });
        }else{
          res.status(404);
          res.json({
            success: false,
            msg: '账户名或者密码错误'
          });
        }
      });
    break;
    default: 
      res.json({
        success: false,
        msg: '请求错误'
      });
    break;
  }
});

// 删除用户信息
router.delete('/', function(req,res, next) {
  res.json({
    success: true
  });
});

module.exports = router;
