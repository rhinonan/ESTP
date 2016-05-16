var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var extend = require('util')._extend;
require('../../dbConfig.js');

var DynamicModel = mongoose.model('Dynamic');
var UsersModel = mongoose.model('Users');
/**
 * 查询动态
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next) {}          [description]
 * @return {[type]}       [description]
 */
router.get('/', function(req, res, next) {
    var type = req.query.type,
        page,
        userId,
        i,
        dynamicId,
        resData,
        pageNum;
    switch (type) {
      /**
       * 查询一条动态
       */
      case "id":
        dynamicId = req.query.dynamicId;
        DynamicModel.findById(dynamicId, function(err, dynamic) {
          if (err || !dynamic) {
            res.json({
                success: false,
                msg: "用户信息查询失败"
            });
            res.status(404);
          } else {
            res.json({
                success: true,
                data: dynamic
            });
          }
        });
        break;      
        case "userId":
          userId = req.query.userId;
          DynamicModel.findOne({
            userId: userId
          }, function(err, dynamic) {
            if (err || !dynamic) {
              res.status(404);
              res.json({
                  success: false,
                  msg: "用户信息查询失败"
              });
            } else {
              res.json({
                  success: true,
                  data: dynamic
              });
            }
          });
        break;

        /**
         * 查询所有动态
         */
      case "multi":
        page = req.query.page || 0;
        pageNum = req.query.pageNum || 10;
        DynamicModel.find({})
          .sort({'_id':-1})
          .skip(page * pageNum)
          .limit(pageNum)
          .exec(function(err, dynamics) {
            if (err || !dynamics) {
              res.status(404);
              res.json({
                  success: false,
                  msg: '查询失败'
              });
            } else {
              res.json({
                success: true,
                data: dynamics
              });
              
            }
          });
        break;
        /**
         * 默认
         */
      case 'userId':
        userId = req.query.userId;
        page = req.query.page || 0;
        pageNum = req.query.pageNum || 0;
        DynamicModel.find({
          userId: userId
        })
        .skip(page * pageNum)
        .limit(pageNum)
        .exec(function(err, dynamics) {
          if(err || !dynamics){
            res.status(404);
            res.json({
              success: false,
              msg: '参数错误'
            });
          }else{
            res.json({
              success: true,
              data: dynamics
            });
          }
        });
      break;
      default:
        res.status(404);
        res.json({
            success: false,
            msg: '请求错误'
        });
      break;
    }
});


/**
 * 新增动态，
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next) {}          [description]
 * @return {[type]}       [description]
 */
router.post('/', function(req, res, next) {
    var type = req.body.type,
        newDynamicModel,
        userId;
    switch (type) {
      /**
       * 新增动态 addDynamic
       */
      case 'add':
        userId = req.body.userId;
          var newDynamic = {
            userId: userId,
            title: req.body.title,
            content: req.body.content,
            praise: 0,
            comment: 0,
            date: new Date()
          };
          newDynamicModel = new DynamicModel(newDynamic);
          newDynamicModel.save(function(err) {
            if (err) {
              res.json({
                success: false,
                msg: err
              });
            } else {
              res.json({
                success: true,
                msg: "新增动态成功！"
              });
            }
          });
        break;
          /**
           * 点赞/取消点赞
           */
        case 'praise':
            /**
             * 点赞数量加减
             */
            praise = req.body.praise;
            dynamicId = req.body.dynamicId;
            if (praise) {
              // 点赞
              DynamicModel.findById(dynamicId, function(err, dynamic) {
                if (err || !dynamic) {
                  res.json({
                      success: true,
                      msg: err || '未传递动态id'
                  });
                  res.status(404);
                } else {
                  dynamic.praise = dynamic.praise + 1;
                  dynamic.save(function(err) {
                    if (err) {
                        res.json({
                            succcess: false,
                            msg: err
                        });
                        res.status(404);
                    } else {
                        res.json({
                            success: true,
                            msg: '点赞成功'
                        });
                    }
                  });
                }
              });
            } else {
              DynamicModel.findById(dynamicId, function(err, dynamic) {
                if (err) {
                  res.json({
                      success: true,
                      msg: err
                  });
                  res.status(404);
                } else {
                  dynamic.praise = dynamic.praise - 1;
                  dynamic.save(function(err) {
                    if (err) {
                      res.json({
                          succcess: false,
                          msg: err
                      });
                      res.status(404);
                    } else {
                      res.json({
                          success: true,
                          msg: '取消点赞成功'
                      });
                      }
                  });
                }
              });
            }
            break;


            /**
             * 默认
             */
        default:
          res.json({
              success: false,
              msg: '请求错误'
          });
        break;
    }

});

module.exports = router;
