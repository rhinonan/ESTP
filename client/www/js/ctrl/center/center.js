/**
 * 个人中心控制器
 */
angular.module('centerCtrl',[])
.controller('centerCtrl', function($scope, backend, userSer){
  function _init() {
    console.log('个人中心控制器启动');
    $scope.loginState = backend.isLogin();
    userSer.getUserInfo.byId({
      userId: backend.getUserId(),
      type: 'id'
    }, function (info) {
      $scope.userInfo = info.data;
    }, function (info) {
      console.log(info.data);
    });
  }
  _init();
});