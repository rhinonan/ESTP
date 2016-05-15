var express = require('express');
var router = express.Router();
var ccap = require('ccap');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req);
  res.render('index', { title: 'Express' });
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
