/**
 * 登录注册控制器
 */
angular.module('loginCtrl',[])
.controller('loginCtrl', function($scope, backend, $state, userSer, $ionicPopup){
  function _init() {
    console.log('用户登录控制器启动');
    $scope.user = {};
  }
  _init();
  $scope.login = function () {
    if($scope.user.username && $scope.user.password){
      userSer.postUserInfo.login({
        username: $scope.user.username,
        password: $scope.user.password,
        type:'login'
      }, function (info) {
        $ionicPopup.show({
          template: '<span style="text-align:center;display:block" class="balanced">登录成功</span>',
          title: '登录成功',
          scope: $scope,
          buttons: [{
            text: '确定',
            type: 'button-balanced',
            onTap: function () {
              backend.setUserId(info.data._id);
              backend.setUserAvatar(info.data.avatar);
              $state.go('tab.center', {},{
                reload: true
              });
              // $state.reload();
              return true;
            }
          }]
        });
      }, function (info) {
        $ionicPopup.show({
          template: '<span style="text-align:center;display:block" class="assertive">'+info.data.msg+'</span>',
          title: '登录失败',
          scope: $scope,
          buttons: [{
            text: '确定',
            type: 'button-assertive',
          }]
        });
      });
    }
  };
  $scope.register = function() {
    $state.go('register', {});
  };
})
.controller('registerCtrl', function($scope, $state, userSer, $ionicPopup, workTypeSer, backend, authSer, configuration){
  function _init() {
    $scope.user = {};
    $scope.user.type = 'add';
    authSer.get({}, function (data) {
      $scope.auth = data.auth;
      $scope.authImg = configuration.apiUrl+'api/auth/'+$scope.auth;
    });


    workTypeSer.getWorkTypeInfo.list({
      type: 'all'
    }, function(data) {
      $scope.workTypeList = data.data;
      console.log($scope.workTypeList);
    }, function(data) {
      // body...
    });
  }
  _init();


  $scope.submit = function () {
    if($scope.auth !== $scope.user.auth){
      show('验证码错误', true);
      return false;
    }
    if($scope.user.password !== $scope.user.confirmPassword){
      show('重复密码错误', true);
      return false;
    }
    userSer.postUserInfo.post($scope.user, function (data) {
      show('注册成功！');
    }, function (data) {
      show('注册失败', true);
    });
  };

  $scope.refreshAuth = function () {
    authSer.get({}, function (data) {
      $scope.auth = data.auth;
      $scope.authImg = configuration.apiUrl+'api/auth/'+$scope.auth;
    });
  };

  function show(msg, error) {
    var classname = '';
    if(error){
      classname = 'assertive';
    }else{
      classname = 'balanced';
    }
    $ionicPopup.show({
      template: '<span style="text-align:center;display:block" class="'+classname+'">'+msg+'</span>',
      title: '登录失败',
      scope: $scope,
      buttons: [{
        text: '确定',
        type: 'button-'+classname,
        onTap: function () {
          if(!error){
            $state.go('login',{});
          }
        }
      }]
    });
  }
});