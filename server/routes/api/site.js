var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../dbConfig.js');

var SiteModel = mongoose.model('Site');

/**
 * 查询场地
 */
router.get('/', function(req, res, next) {
  var type = req.query.type,
      page,
      pageNum;
  switch (type) {
    /**
     * 查询一条场地详情
     */
    case "id":
      siteId = req.query.siteId;
      SiteModel.findById(siteId, function(err, site) {
        if (err || !site) {
          res.json({
              success: false,
              msg: "场地信息查询失败"
          });
          res.status(404);
        } else {
          res.json({
              success: true,
              data: site
          });
        }
      });
    break;

    /**
     * 查询所有场地信息
     */
    case "multi":
      page = req.query.page || 0;
      pageNum = req.query.pageNum || 10;
      SiteModel.find({})
        .skip(page * pageNum)
        .limit(pageNum)
        .exec(function(err, site) {
          if (err) {
              res.status(404);
              res.json({
                  success: false,
                  msg: '查询失败'
              });
          } else {
              res.json({
                  success: true,
                  data: site
              });
          }
        });
      break;

        /**
         * 默认
         */
    default:
      res.json({
          success: false,
          msg: '请求错误'
      });
    break;
  }
});


/**
 * 新增场地，
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next) {}          [description]
 * @return {[type]}       [description]
 */
router.post('/', function(req, res, next) {
  var type = req.body.type,
      newSiteModel;
  switch (type) {
    /**
     * 新增场地 addSite
     */
    case 'add':
      var newSite = {
        title: req.body.title, //场地名称
        master: req.body.master, // 场地负责人
        detial: req.body.detial, //场地详情
        price: req.body.price, // 场地价格
        address: req.body.address, // 场地地址
        tel: req.body.tel, // 场地联系电话
        merit: req.body.merit, //场地优点
        imgs: req.body.imgs, // 场地图片
        date: new Date()
      };
      newSiteModel = new SiteModel(newSite);
      newSiteModel.save(function(err) {
        if (err) {
          res.json({
              success: false,
              msg: err
          });
          res.status(404);
        } else {
          res.json({
              success: true,
              msg: "新增场地成功！"
          });
        }
      });
      break;


      /**
       * 默认
       */
      default:
        res.json({
          success: false,
          msg: '请求错误'
        });
        res.status(404);
      break;
    }

});

module.exports = router;
