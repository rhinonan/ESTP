var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var util = require('util');

var mongoose = require('mongoose');
require('../../dbConfig.js');

var UsersModel = mongoose.model('Users');
/* GET home page. */
router.get('/', function(req, res, next) {  
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/api/image" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title" /> '+
    '<input type="file" name="upload" multiple="multiple" /> '+
    '<input type="submit" value="Upload" />'+
    '</form>'
  );
});

router.post('/', function(req, res) {
    var form = new formidable.IncomingForm();
 
    form.parse(req, function(err, fields, files) {
      console.log(fields);
      console.log(files);
      if(err){
        res.status(404).json({
          success: false,
          msg: err
        });
        return false;
      }
      var imgName = (new Date()).getTime() + Math.random().toString(36).substr(2,2);
      var hostname = req.hostname + ':4000/upload/';
      var tmp_path = files.file.path+'';
      // // 指定文件上传后的目录 - 示例为"images"目录。 
      var target_path = 'public/upload/' + imgName+'.jpg';
      var returnSrc = hostname +imgName+'.jpg';
      fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        fs.unlink(tmp_path, function() {
           if (err) throw err;
           res.json({
            success: true,
            data: {
              imgSrc: returnSrc
            }
           });
        });
      });
    });
});
router.post('/:userId', function(req, res) {
    var form = new formidable.IncomingForm();
    var userId = req.params.userId;
    form.parse(req, function(err, fields, files) {
      if(err){
        res.status(404).json({
          success: false,
          msg: err
        });
        return false;
      }
      var imgName = (new Date()).getTime() + Math.random().toString(36).substr(2,2);
      var hostname = req.hostname + ':4000/upload/';
      var tmp_path = files.file.path+'';
      // // 指定文件上传后的目录 - 示例为"images"目录。 
      var target_path = 'public/upload/' + imgName+'.jpg';
      var returnSrc = 'http://' + hostname +imgName+'.jpg';
      UsersModel.findById(userId, function(err, user) {
        user.avatar = returnSrc;
        console.log(returnSrc);
        user.save(function (err) {
          if(err){
            console.log(err);
          }else{
            res.json({
              success: true,
              imgSrc : returnSrc
            });
          }
        });
      });
      fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        fs.unlink(tmp_path, function() {
           if (err) throw err;
           // res.json({
           //  success: true,
           //  data: {
           //    imgSrc: returnSrc
           //  }
           // });
        });
      });
    });
});
module.exports = router;
