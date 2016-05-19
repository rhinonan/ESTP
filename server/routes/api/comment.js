var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../dbConfig.js');

var CommentModel = mongoose.model('Comment');
var UsersModel = mongoose.model('Users');
var DynamicModel = mongoose.model('Dynamic');

router.get('/', function (req, res) {
  var userId;
  var commentId;
  var sponsor;
  var itemId;
  var type;
  var page;
  var pageNum;
  type = req.query.type;
  switch(type){
    case 'id':
      // 查询单条评论详情
      commentId = req.query.commentId;
      CommentModel.findById(commentId, function (err, comment) {
        if(err || !comment){
          res.status(404);
          res.json({
            success: false,
            msg: err || '未传递评论id'
          });
        }else{
          res.json({
            success: true,
            data: comment
          });
        }
      });
    break;
    case 'itemId':
      /**
       * 根据内容id 查找
       * @type {[type]}
       */
      itemId = req.query.itemId;
      page = req.query.page || 0;
      pageNum = req.query.pageNum || 10;
      CommentModel.find({
        itemId: itemId,
      })
      .skip(page * pageNum)
      .limit(pageNum)
      .exec(function (err, comments) {
        if(err){
          res.status(404);
          res.json({
            success: false,
            msg: err
          });
        }else{
          res.json({
            success: true,
            data: comments
          });
        }
      });
    break;
    case 'appoint':
      // 返回内容id 下评论总数
      itemId = req.query.itemId;
      CommentModel.count({
        itemId: itemId
      }, function (err, number) {
        if(err){
          res.status(404);
          res.json({
            success: false,
            msg: err,
          });
        }else{
          res.json({
            success: true,
            data:{
              number: number
            }
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

router.post('/', function (req, res) {
  var userId;
  var commentId;
  var sponsor;
  var itemId;
  var type;
  var newComment;

  type = req.body.type;
  console.log(type);
  switch(type){
    case 'add':
      userId = req.body.userId;
      itemId = req.body.itemId;
      UsersModel.findById(userId, function (err, user) {
        if(err || !user || !itemId){
          res.status(404);
          res.json({
            success: false,
            msg: err || '未传递userId或者itemId'
          });
          
        }else{
          sponsor = user.user;
          newComment = {
            content: req.body.content,
            userId: userId,
            sponsor: sponsor,
            itemId : itemId,
            date: new Date()
          };
          newCommentModel = new CommentModel(newComment);
          newCommentModel.save(function (err, comment) {
            if(err){
              res.status(404);
              res.json({
                success: false,
                msg: err,
              });
            }else{
              res.json({
                success: true,
                data: comment
              });
            }
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