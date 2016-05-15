/**
 * 活动相关控制器
 */
angular.module('activityCtrl',[])
.controller('activityCtrl', function($scope, backend, userSer, $state, activitySer){
  function _init() {
    console.log('活动控制器启动');
    activitySer.get({
      type: 'multi'
    }, function (info) {
      $scope.activityList = info.data;
    }, function (info) {
      // body...
    });
  }
  _init();

  $scope.goDetail = function(id) {
    $state.go('tab.activity-detail',{
      activityId: id
    });
  };
})
.controller('activityDetailCtrl', function($scope, $stateParams, backend, userSer, $state, activitySer){
  function _init() {
    console.log('活动详情控制器启动');
    activitySer.get({
      type: 'id',
      activityId: $stateParams.activityId
    }, function (info) {
      $scope.activity = info.data;
    }, function (info) {
      // body...
    });
  }
  _init();
});
