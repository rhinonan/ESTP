function generateRandomAlphaNum(len) {
  var rdmString = "";

  for (; rdmString.length < 6; rdmString += Math.random().toString(36).substr(2,1));
  return rdmString;
}
var express = require('express');
var router = express.Router();
var fs = require('fs');
var ccap = require('ccap');
/* GET home page. */
router.get('/', function(req, res, next) {  
  res.json({
    success: true,
    auth: generateRandomAlphaNum(6)
  });
});
router.get('/:auth', function(req, res, next) {
  var auth = req.params.auth;
  var foo = ccap({
    generate:function(){
       return auth;
    }
  });
  res.end(foo.get()[1]);
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
