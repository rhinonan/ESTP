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
.controller('registerCtrl', function($scope, backend, $cordovaImagePicker){
  // backend.setUserId('57317e9595b335df532d574b');
  console.log('用户注册控制器启动');
  $scope.pickImage = function () {
    console.log("haha");
    var options = {
        maximumImagesCount: 1,
        width: 800,
        height: 800,
        quality: 80
    };
    $cordovaImagePicker.getPictures(options)
        .then(function (results) {
            console.log(results);
            $scope.imgSrc = results[0];
        }, function (error) {
            // error getting photos
        });
};
});