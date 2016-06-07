var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../dbConfig.js');


var ActivityModel = mongoose.model('Activity');

router.get('/', function (req, res) {
  var type;
  var activityId;
  var page;
  var pageNum;
  type = req.query.type;
  switch(type){
    /**
     * 通过id获取
     */
    case 'id':
      activityId = req.query.activityId ;
      ActivityModel.findById(activityId, function (err, ac) {
        if(err || !ac){
          res.status(404);
          res.json({
            suceess: false,
            msg: err || '未传递id'
          });
        }else{
          res.json({
            success: true,
            data: ac
          });
        }
      });
    break;
    /**
     * 获取多个
     */
    case 'multi':
      page = req.query.page || 0;
      pageNum = req.query.pageNum || 10;
      ActivityModel.find({})
      .sort({'_id':-1})
      .skip(page * pageNum)
      .limit(pageNum)
      .exec(function (err, activities) {
        if(err){
          res.status(404);
          res.json({
            success: false,
            msg: '查询失败'
          });
        }else{
          res.json({
            success: true,
            data: activities
          });
        }
      });
    break;
    default:
      res.json({
        success: false,
        msg: '参数错误'
      });
    break;  
  }
});

router.post('/', function (req, res) {
  var type;
  var newActicityModel;
  var newActicity;
  var activityId;

  type = req.body.type;
  switch(type){
    /**
     * 新增活动
     */
    case 'add': 
      console.log(req.body);
      newActicity = {
        userId: req.body.userId,
        title: req.body.title,
        detail: req.body.detail,
        address: req.body.address,
        unit: req.body.unit,
        master: req.body.master,
        tel: req.body.tel,
        charge: req.body.charge,
        img: 'http://'+ req.hostname+':4000/images/activity.jpg',

        peopleNum:req.body.peopleNum,
        date: new Date(),
        holdDate: new Date(req.body.holdDate)
      };
      newActicityModel = new ActivityModel(newActicity);
      newActicityModel.save(function (err, activity) {
        if(err){
          res.json({
            success: false,
            msg: err
          });
          res.status(404);
        }else{
          if(req.body.from === 'admin'){
            res.redirect('../../../admin/activity');
          }else{
            res.json({
              success: true,
              msg: '新增活动成功',
              data: {
                acticityId: activity._id
              }
            });
          }
        }
      });
    break;
    case 'attend':
      activityId = req.body.activityId;
      ActivityModel.findById(activityId, function (err, activity) {
        if(err || !activity){
          res.json({
            success: false,
            msg: err || '未传递id'
          });
          res.status(404);
        }else{
          activity.peopleNum = activity.peopleNum + 1;
          activity.save(function (err, activity) {
            if(err){
              res.json({
                success: false,
                msg: err
              });
              res.status(404);
            }else{
              res.json({
                succcess: true,
                msg: '参与活动成功',
                data: {
                  acticityId: activity._id
                }
              });
            }
          });
        }
      });
    break;
    case 'update':
      activityId = req.body.activityId;
      console.log(req.body);
      ActivityModel.findById(activityId, function(err, activity) {
        if(err){}else{
          activity.title = req.body.title;
          activity.tel = req.body.tel;
          activity.address = req.body.address;
          activity.unit = req.body.unit;
          activity.master = req.body.master;
          activity.charge = req.body.charge;
          activity.holdDate = new Date(req.body.holdDate);
          activity.detail = req.body.detail;
          activity.userId = req.body.userId;
          activity.save(function(err) {
            if(err){
              res.status(404);
            }else{
              if(req.body.from === 'admin'){
                res.redirect('../../../admin/activity');
              }else{
                res.json({
                  success: true
                });
              }
            }
          });
        }
      });
    break;
    case 'delete':
      activityId  = req.body.id;
      ActivityModel.remove({
        _id: activityId
      }, function(err, data) {
        if(err){

        }else{
          res.json({
            success: true
          });
        }
      });
    break;
    default:
      res.status(404).json({
        success: false,
        msg: '参数错误'
      });
    break;
  }
});
module.exports = router;