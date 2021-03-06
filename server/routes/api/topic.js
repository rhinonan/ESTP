var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../dbConfig.js');


var TopicModel = mongoose.model('Topic');
var UsersModel = mongoose.model('Users');
router.get('/', function (req, res) {
  var type;
  var topicId;
  var page;
  var pageNum;
  type = req.query.type;
  switch(type){
    case 'id':
    /**
     * 通过id获取详情
     */
      topicId = req.query.topicId;
      TopicModel.findById(topicId, function (err, topic) {
        if(err || !topic){
          res.status(404);
          res.json({
            success: false,
            msg: err || '未传递id'
          });
        }else{
          topic.read ++;
          topic.save();
          res.json({
            success: true,
            data: topic
          });
        }
      });
    break;
    case 'multi':
      /**
       * 查询多条数据
       * @type {[type]}
       */
      page = req.query.page || 0;
      pageNum = req.query.pageNum || 10;
      TopicModel.find({})
      .sort({'_id':-1})
      .skip(page * pageNum)
      .limit(pageNum)
      .exec(function (err, topics) {
        if(err || !topics){
          res.status(404);
          res.json({
            success: false,
            msg: err || '未查询到数据'
          });
        }else{
          res.json({
            success: true,
            data: topics,
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
  }
});

router.post('/', function (req, res) {
  var type;
  var userId;
  var sponsor;
  var newTopic;
  var newTopicModel;
  var praise;
  var topicId;

  userId = req.body.userId;
  type = req.body.type;
  console.log(req.body);
  switch(type){
    case 'add':
      UsersModel.findById(userId, function (err, user) {
        if(err || !user){
          res.status(404);
          res.json({
            success: false,
            msg: err || '未传递用户id',
          });
        }else{
          sponsor = user.user;
          newTopic = {
            sponsor: sponsor,
            userId: userId,
            title: req.body.title,
            detail: req.body.detail,
            tag: req.body.tag,
            read : 0,
            praise: 0,
            comment: 0,
            date : new Date()
          };
          newTopicModel = new TopicModel(newTopic);
          newTopicModel.save(function (err, topic) {
            if(err){
              res.status(404);
              res.json({
                success: false,
                msg: err,
              });
            }else{
              if(req.body.from === 'admin'){
                res.redirect('../../admin/topic');
              }else{
                res.json({
                  success: true,
                  data: {
                    topicId: topic._id
                  }
                }); 
              }
            }
          });
        }
      });
    break;
    case 'praise':
    /**
     * 点赞数量加减
     */
      praise = req.body.praise;
      topicId = req.body.topicId;
      if(praise){
        // 点赞
        TopicModel.findById(topicId, function (err, topic) {
          if(err || !topic){
            res.json({
              success: true,
              msg: err || '未传递话题id'
            });
            res.status(404);
          }else{
            topic.praise = topic.praise + 1;
            topic.save(function (err) {
              if(err){
                res.json({
                  succcess: false,
                  msg: err
                });
                res.status(404);
              }else{
                res.json({
                  success: true,
                  msg: '点赞成功'
                });
              }
            });
          }
        });
      }else{
        TopicModel.findById(topicId, function (err, topic) {
          if(err){
            res.status(404);
            res.json({
              success: true,
              msg: err
            });
          }else{
            topic.praise = topic.praise - 1;
            topic.save(function (err) {
              if(err){
                res.status(404);
                res.json({
                  succcess: false,
                  msg: err
                });
              }else{
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
    case 'update':
      topicId = req.body.topicId;
      UsersModel.findById(userId, function (err, user) {
        if(err || !user){
          res.status(404);
          res.json({
            success: false,
            msg: err || '未传递用户id',
          });
        }else{
          TopicModel.findById(topicId, function (err, topic) {
            topic.sponsor = user.user;
            topic.userId= userId;
            topic.title= req.body.title;
            topic.detail= req.body.detail;
            topic.tag= req.body.tag;
            topic.save(function(err) {
              if(err){
                res.stauts(404);
              }else{
                if(req.body.from === 'admin'){
                  res.redirect('../../../admin/topic');
                }else{
                  res.json({
                    success: true
                  });
                }
              }
            });
          });
        }
      });
    break;
    case 'delete':
      topicId = req.body.id;
      TopicModel.remove({
        _id: topicId
      }, function (err) {
        if(err){
          res.status(404);
        }else{
          res.json({
            success: true
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
module.exports = router;