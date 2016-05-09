var express = require('express');
var router = express.Router();

// 获取用户基本信息
router.get('/', function(req, res, next) {
  res.json({
    success: true
  });
});

// 新增用户信息 或者修改用户信息
router.post('/', function (req, res, next) {
  res.json({
    success: true
  });
});

// 删除用户信息
router.delete('/', function(req,res, next) {
  res.json({
    success: true
  });
});

module.exports = router;
