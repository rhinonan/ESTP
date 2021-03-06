/**
 * 个人中心控制器
 */
angular.module('centerCtrl',[])
.controller('centerCtrl', function($scope, backend, userSer, $state, dynamicSer){
  function _init() {
    $scope.loginState = backend.isLogin();
    $scope.lastDynamic = {};
    userSer.getUserInfo.byId({
      userId: backend.getUserId(),
      type: 'id'
    }, function (info) {
      $scope.userInfo = info.data;
    }, function (info) {
      console.log(info.data);
    });

    dynamicSer.getDynamicInfo.multi({
      type: 'userId',
      userId: backend.getUserId()
    }, function (info) {
      $scope.lastDynamic = info.data[0];
    }, function (info) {
      $scope.lastDynamic = {
        content: '还没有发布过动态'
      };
    });

  }
  _init();

  $scope.doRefresh = function() {
    $scope.loginState = backend.isLogin();
    $scope.lastDynamic = {};
    userSer.getUserInfo.byId({
      userId: backend.getUserId(),
      type: 'id'
    }, function (info) {
      $scope.userInfo = info.data;
      $scope.$broadcast('scroll.refreshComplete');
    }, function (info) {
      console.log(info.data);
    });

    dynamicSer.getDynamicInfo.multi({
      type: 'userId',
      userId: backend.getUserId()
    }, function (info) {
      $scope.lastDynamic = info.data[0];
      $scope.$broadcast('scroll.refreshComplete');
    }, function (info) {
    });
  };

  $scope.login = function() {
    $state.go('login',{});
  };
  /**
   * 跳转到个人资料详细页面
   * @return {[type]} [description]
   */
  $scope.goUserInfo = function() {
    $state.go('tab.userInfo',{
      userId: backend.getUserId()
    });
  };

  $scope.logoOut = function() {
    $scope.loginState = false;
    backend.clear();
  };

  $scope.goPostRequire = function() {
    $state.go('tab.post-require',{});
  };
  $scope.goPostDynamic = function() {
    $state.go('tab.post-dynamic',{});
  };
  $scope.goPostActivity = function() {
    $state.go('tab.post-activity',{});
  };
  $scope.goPostTopic = function() {
    $state.go('tab.post-topic',{});
  };
})
.controller('userInfoCtrl', function($scope, backend, userSer, $state){
  function _init() {
    console.log('个人详情控控制器启动');
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
  $scope.login = function() {
    $state.go('login',{});
  };
  $scope.goChangePwd = function() {
    $state.go('tab.changePwd',{});
  };
  $scope.goChangeInfo = function() {
    $state.go('tab.changeInfo',{});
  };
})

/**
 * 修改密码控制器
 * @param  {[type]} $scope    [description]
 * @param  {[type]} backend   [description]
 * @param  {[type]} userSer   [description]
 * @param  {[type]} $state){               function _init() {    console.log('修改密码控制器启动');                 $scope.loginState [description]
 * @param  {[type]} function  (info)        {                     $scope.userInfo           [description]
 * @param  {[type]} function  (info)        {                     console.log(info.data);                   });                            }  _init();} [description]
 * @return {[type]}           [description]
 */
.controller('changePwdCtrl', function($scope, backend, userSer, $state, $ionicPopup, $ionicHistory){
  function _init() {
    console.log('修改密码控制器启动');
    $scope.user = {};
  }
  _init();
  $scope.back = function() {
    $ionicHistory.goBack();
  };
  $scope.changePwd = function () {

    if($scope.user.newPwd !== $scope.user.repPwd){
      $ionicPopup.show({
        template: '<span style="text-align:center;display:block" class="assertive">重复密码错误</span>',
        title: '重复密码错误',
        scope: $scope,
        buttons: [{
          text: '确定',
          type: 'button-assertive',
        }]
      });
    }else{
      userSer.postUserInfo.changePwd({
        userId: backend.getUserId(),
        type:'password',
        oldPwd: $scope.user.oldPwd,
        newPwd: $scope.user.newPwd,
      }, function (info) {
        $ionicPopup.show({
          template: '<span style="text-align:center;display:block" class="balanced">修改成功</span>',
          title: '修改成功',
          scope: $scope,
          buttons: [{
            text: '确定',
            type: 'button-balanced',
            onTap: function () {
              $state.go('tab.center', {});
              return true;
            }
          }]
        });
        $state.go('tab.center');
      }, function (info) {
        $ionicPopup.show({
        template: '<span style="text-align:center;display:block" class="assertive">'+info.data.msg+'</span>',
        title: info.data.msg,
        scope: $scope,
        buttons: [{
          text: '确定',
          type: 'button-assertive',
        }]
      });
      });
    }
  };
})
.controller('changeInfoCtrl', function($scope, backend, userSer, $state, $ionicPopup,$ionicHistory, workTypeSer){
  function _init() {
    console.log('修改资料控制器启动');
    workTypeSer.getWorkTypeInfo.list({
      type: 'all'
    }, function (data) {
      $scope.workTypeList = data.data;
      console.log($scope.workTypeList);
    }, function (info) {
      console.log(info.data);
    });
    $scope.user = {};
  }
  _init();

  $scope.back = function() {
    $ionicHistory.goBack();
  };

  $scope.changeInfo = function () {
      userSer.postUserInfo.changeInfo({
        userId: backend.getUserId(),
        type:'update',
        user: $scope.user.name,
        tel: $scope.user.tel,
        email: $scope.user.email,
        workType: $scope.user.workType
      }, function (info) {
        $ionicPopup.show({
          template: '<span style="text-align:center;display:block" class="balanced">修改成功</span>',
          title: '修改成功',
          scope: $scope,
          buttons: [{
            text: '确定',
            type: 'button-balanced',
            onTap: function () {
              $state.go('tab.center', {});
              return true;
            }
          }]
        });
        $state.go('tab.center');
      }, function (info) {
        $ionicPopup.show({
        template: '<span style="text-align:center;display:block" class="assertive">'+info.data.msg+'</span>',
        title: info.data.msg,
        scope: $scope,
        buttons: [{
          text: '确定',
          type: 'button-assertive',
        }]
      });
      });
    
  };
});
