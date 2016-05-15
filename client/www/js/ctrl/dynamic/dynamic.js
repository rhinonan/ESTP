/**
 * 个人中心控制器
 */
angular.module('dynamicCtrl',[])
.controller('dynamicCtrl', function($scope, backend, userSer, $state, dynamicSer, commentSer){
  function _init() {
    console.log('动态圈控制器启动');
    $scope.users = [];
    $scope.dynamics = [];
    $scope.loginState = backend.isLogin();
    dynamicSer.getDynamicInfo.multi({
      userId: backend.getUserId(),
      type: 'multi'
    }, function (info) {
      $scope.dynamics = info.data;
      for(var i =info.data.length -1 ;i>=0; i--){
        getSingleUser(info.data[i].userId);
        getCommentCount(info.data[i]._id, i);
      }
    }, function (info) {
      console.log(info.data);
    });
  }
  _init();
  $scope.login = function() {
    $state.go('login',{});
  };


  $scope.goUserInfo = function() {
    $state.go('tab.userInfo',{
      userId: backend.getUserId()
    });
  };
  

  $scope.logoOut = function() {
    $scope.loginState = false;
    backend.clear();
  };


  $scope.praise = function(index) {
    $scope.dynamics[index].ifPraise = true;  
    $scope.dynamics[index].praise++;  
    dynamicSer.postDynamicInfo.changeInfo({
      type:'praise',
      praise: true,
      dynamicId: $scope.dynamics[index]._id
    }, function() {
      
    });
  };


  $scope.showCommentForm = function(index) {
    $scope.dynamics[index].showComment = $scope.dynamics[index].showComment ? false: true ;
  };


  $scope.subimtComment = function(index) {
    commentSer.post({
      type: 'add',
      itemId: $scope.dynamics[index]._id,
      userId: backend.getUserId()
    }, function (data) {
      $scope.dynamics[index].showComment = false;
      $scope.dynamics[index].tempComment = '';
      $scope.dynamics[index].comment ++;
    });
  };


  $scope.goDetail = function (id) {
    $state.go('tab.dynamicDetail',{
      dynamicId: id
    });
  };

  function getSingleUser(userId) {
    userSer.getUserInfo.byId({
      userId: userId,
      type: 'id'
    }, function (info) {
      $scope.users.push(info.data);
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
.controller('dynamicDetailCtrl',  function($scope, $stateParams){
  function _init() {
    $scope.itemId = $stateParams.dynamicId;
  }
  _init();
});
