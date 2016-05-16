/**
 * 话题相关控制器
 */
angular.module('topicCtrl',[])
.controller('topicCtrl', function($scope, backend, userSer, $state, topicSer){
  function _init() {
    console.log('话题控制器启动');
    topicSer.get({
      type: 'multi'
    }, function (info) {
      $scope.topicList = info.data;
    }, function (info) {
      // body...
    });
  }
  _init();


  $scope.doRefresh = function() {
    topicSer.get({
      type: 'multi'
    }, function (info) {
      $scope.activityList = info.data;
      $scope.$broadcast('scroll.refreshComplete');
    }, function (info) {
      
    });
  };

  $scope.goDetail = function(id) {
    $state.go('tab.topic-detail',{
      topicId: id
    });
  };
})



.controller('topicDetailCtrl', function($scope,commentSer, $stateParams, backend, userSer, $state, topicSer){
  function _init() {
    $scope.commentUsers = [];
    $scope.buttonText = '添加评论';
    $scope.temp = {};
    $scope.showCommentForm = false;
    topicSer.get({
      type: 'id',
      topicId: $stateParams.topicId
    }, function (info) {
      $scope.topic = info.data;

      commentSer.get({
        type: 'itemId',
        itemId: $stateParams.topicId
      }, function (info) {
        $scope.commentUsers = [];
        $scope.comments = info.data;
        $scope.topic.comment = $scope.comments.length;
        for(var i = info.data.length -1 ;i >= 0;i--){
          getSingleUser(info.data[i].userId);
        }
      }, function (info) {
        
      });


    }, function (info) {
      console.log(123);
    });




  }
  _init();





  $scope.showComment = function () {
    if($scope.showCommentForm){
      commentSer.post({
        type: 'add',
        content: $scope.temp.tempComment,
        userId: backend.getUserId(),
        itemId: $stateParams.topicId,
      }, function (info) {
        $scope.comments.push(info.data);
        $scope.commentUsers.push({
          avatar: backend.getUserAvatar()
        });
        $scope.topic.comment ++;
        $scope.temp.tempComment = '';
      }, function (info) {
        
      });
    }
    $scope.showCommentForm = $scope.showCommentForm ? false : true;
    $scope.buttonText = '提交';

  };

  $scope.closeComment = function() {
    $scope.showCommentForm = false;
    $scope.buttonText = '添加评论';
  };

  function getSingleUser(userId) {
    userSer.getUserInfo.byId({
      userId: userId,
      type: 'id'
    }, function (info) {
      $scope.commentUsers.push(info.data);
    });
  }


  function getCommentCount(itemId,index) {
    commentSer.get({
      type: 'appoint',
      itemId: itemId
    }, function (info) {
      $scope.dynamics[index].comment = info.data.number;
    });
  }
})



.controller('postTopicCtrl', function($scope, $state, $ionicHistory,$timeout, backend, topicSer, validSer, showPopSer){
  var valid = {};
  var form = {};

  function _init() {
    $scope.topic = {};
  }
  _init();


  $scope.submit = function () {
    var pro;
    valid = validSer($scope.topic, 3);
    if(!valid.valid){
      return false;
    }else{
      angular.copy($scope.topic,form);
      form.type = 'add';
      form.userId = backend.getUserId();
      topicSer.post(form, function () {
        pro = showPopSer('发布成功');
        pro.then(function () {
          $state.go('tab.center', {});
        });
      }, function () {
        showPopSer('发布失败',true);
      });
    }
  }; 
    $scope.back = function() {
      $ionicHistory.goBack();
    };
});
