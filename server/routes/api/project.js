var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../dbConfig.js');

var ProjectModel = mongoose.model('Project');


router.get('/', function(req, res, next) {
    var type = req.query.type,
        page,
        pageNum,
        projectId;
    switch (type) {
      /**
       * 查询一条动态
       */
      case "id":
        projectId = req.query.projectId;
        ProjectModel.findById(projectId, function(err, project) {
          if (err || !project) {
            res.json({
                success: false,
                msg: "用户信息查询失败"
            });
            res.status(404);
          } else {
            res.json({
                success: true,
                data: project
            });
          }
        });
        break;

        /**
         * 查询所有动态
         */
      case "multi":
        page = req.query.page || 0;
        pageNum = req.query.pageNum || 10;
        ProjectModel.find({})
          .sort({'_id':-1})
          .skip(page * pageNum)
          .limit(pageNum)
          .exec(function(err, projects) {
            if (err) {
              res.status(404);
              res.json({
                  success: false,
                  msg: '查询失败'
              });
            } else {
              res.json({
                  success: true,
                  data: projects
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
 * 新增动态，
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next) {}          [description]
 * @return {[type]}       [description]
 */
router.post('/', function(req, res, next) {
    var type = req.body.type,
        newProjectModel,
        projectId,
        userId;
    switch (type) {
      /**
       * 新增动态 addDynamic
       */
      case 'add':
        userId = req.body.userId;
          var newProject = {
            userId: userId,
            name: req.body.name,
            intro: req.body.intro,
            area: req.body.area,
            industry: req.body.industry,
            link: req.body.link,//项目链接
            detail: req.body.detail,// 项目详情
            requireType: req.body.requireType,
            requireDetail: req.body.requireDetail,
            img: req.body.img,
            tel: req.body.tel,
            date: new Date()
          };
          newProjectModel = new ProjectModel(newProject);
          newProjectModel.save(function(err, project) {
            if (err) {
              res.json({
                success: false,
                msg: err
              });
            } else {
              res.json({
                success: true,
                msg: "新增项目需求成功！",
                data: project
              });
            }
          });
        break;
        case 'update':
          projectId = req.body.projectId;
          ProjectModel.findById(projectId, function(err, project) {
            if(err || !project){
              res.json({
                success: false,
                msg: 'Id错误'
              });
              res.status(404);
            }else{
              project.name = req.body.name;
              project.intro = req.body.intro;
              project.area = req.body.area;
              project.industry = req.body.industry;
              project.link = req.body.link;
              project.detail = req.body.detail;
              project.requireType = req.body.requireType;
              project.requireDetail = req.body.requireDetail;
              project.save(function (err, project) {
                if(err){
                  res.json({
                    success: false,
                    msg: '更新失败',
                  });
                  res.status(404);
                }else{
                  res.json({
                    success: true,
                    msg: '更新成功',
                    data: project
                  });
                }
              });
            }
          });
        break;
        case 'delete':
          projectId = req.body.id;
          ProjectModel.remove({
            _id: projectId
          }, function(err) {
            if(err){
              res.render('error', {});
            }else{
              res.json({
                success: true,
              });
            }
          });
        break;
        default:
          res.status(404).json({
              success: false,
              msg: '请求错误'
          });
        break;
    }

});

module.exports = router;
