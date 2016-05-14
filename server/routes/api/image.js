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
      console.log(files.upload.size);
      // 获得文件的临时路径
      var tmp_path = files.upload.path;
      // 指定文件上传后的目录 - 示例为"images"目录。 
      var target_path = './public/images/' + files.upload.name;
      // 移动文件
      fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // 删除临时文件夹文件, 
        fs.unlink(tmp_path, function() {
           if (err) throw err;
           res.send('File uploaded to: ' + target_path + ' - ' + files.upload.size + ' bytes');
        });
      });
      // res.writeHead(200, {'content-type': 'text/plain'});
      // res.write('received upload:\n\n');
      // res.end(util.inspect({fields: fields, files: files}));
    });
});
module.exports = router;
