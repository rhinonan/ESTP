var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('download', { title: 'ESTP下载' });
});

router.get('/foo', function (req, res) {
  // res.send('图形验证码');
  var foo = ccap({
    generate:function(){

       return 'ASKSD';//return the captcha text

  }
  });
   var ary = foo.get();
    var txt = ary[0];
    var buf = ary[1];
    // res.send('123');
    res.end(buf);
});
module.exports = router;
