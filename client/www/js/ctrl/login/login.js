/**
 * 登录注册控制器
 */
angular.module('loginCtrl',[])
.controller('loginCtrl', function($scope, backend, $state){
  function _init() {
    console.log('用户登录控制器启动');
  }
  _init();
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