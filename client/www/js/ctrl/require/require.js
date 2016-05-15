/**
 * 话题相关控制器
 */
angular.module('requireCtrl',[])
.controller('requireCtrl', function($scope, backend, userSer, $state, requireSer){
  function _init() {
    console.log('话题控制器启动');
    requireSer.get({
      type: 'multi'
    }, function (info) {
      $scope.requireList = info.data;
      console.log($scope.requireList);
    }, function (info) {
      // body...
    });
  }
  _init();

  $scope.goDetail = function(id) {
    $state.go('tab.require-detail',{
      requireId: id
    });
  };
})



.controller('requireDetailCtrl', function($scope,commentSer, $stateParams, backend, userSer, $state, requireSer){
  function _init() {
    requireSer.get({
      type: 'id',
      projectId: $stateParams.requireId
    }, function (info) {
      $scope.require = info.data;
    }, function (info) {
      console.log(123);
    });


    // commentSer.get({
    //   type: 'itemId',
    //   itemId: $stateParams.topicId
    // }, function (info) {
    //   $scope.commentUsers = [];
    //   $scope.comments = info.data;
    //   $scope.topic.comment = $scope.comments.length;
    //   for(var i = info.data.length -1 ;i >= 0;i--){
    //     getSingleUser(info.data[i].userId);
    //   }
    // }, function (info) {
      
    // });

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