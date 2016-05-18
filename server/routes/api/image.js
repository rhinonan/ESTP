var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var util = require('util');

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
      var imgName = (new Date()).getTime() + Math.random().toString(36).substr(2,2);
      var hostname = req.hostname + ':4000/upload/';
      var tmp_path = files.file.path+'';
      // // 指定文件上传后的目录 - 示例为"images"目录。 
      var target_path = 'public/upload/' + imgName+'.jpg';
      var returnSrc = hostname +imgName+'.jpg';
      console.log(returnSrc);
      fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        fs.unlink(tmp_path, function() {
           if (err) throw err;
           res.send({
            success: true,
            data: {
              imgSrc: returnSrc
            }
           });
        });
      });
    });
});
module.exports = router;
