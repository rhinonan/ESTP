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
})

.controller('postActivityCtrl',function($scope, workTypeSer, $state, $timeout, backend, activitySer, validSer, showPopSer){
 var valid = {};
 var form = {};

 function _init() {
   $scope.activity = {};
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
   var pro;
   valid = validSer($scope.activity, 8);
   if(!valid.valid){
     return false;
   }else{
     angular.copy($scope.activity,form);
     form.type = 'add';
     form.userId = backend.getUserId();
     activitySer.post(form, function () {
       pro = showPopSer('发布成功');
       pro.then(function () {
         $state.go('tab.center', {});
       });
     }, function () {
       showPopSer('发布失败',true);
     });
   }
 }; 
}); 
