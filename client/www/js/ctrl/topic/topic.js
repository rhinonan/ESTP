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
});
