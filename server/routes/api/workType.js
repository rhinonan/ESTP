var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../dbConfig.js');

var WorkTypeModel = mongoose.model('WorkType');

router.get('/', function (req, res) {
  var type;
  type = req.query.type;
  if(type === 'all'){
    WorkTypeModel.find({}, function (err, data) {
      if(err){
        res.json({
          success: false,
          msg: '查询错误，请与数据库管理员联系'
        });
        res.status(404);
      }else{
        res.json({
          success: true,
          data: data
        });
      }
    });
  }else{
    res.json({
      success: false,
      msg: '参数错误'
    });
    res.status(404);
  }
});

router.post('/', function (req, res) {
  var type;
  var workType;
  var origin;
  var to;
  type =  req.body.type;
  if(type === 'update'){
    origin = req.body.origin;
    to = req.body.to;
    WorkTypeModel.findOne({
      type:origin
    }, function (err, data) {
      if(err || !to || !origin || !data){
        res.json({
          success: false,
          msg: '参数错误'
        });
        res.status(404);
      }else{
        data.type = to;
        data.date = new Date();
        data.save(function (err, data) {
          if(err){
            res.json({
              success: false,
              msg: '更新失败'
            });
            res.status(404);
          }else{
            res.json({
              success: true,
              msg: '更新成功'
            });
          }
        });
      }
    });
  }else{
    res.json({
      success: false,
      msg: '参数错误'
    });
  }
});
module.exports = router;