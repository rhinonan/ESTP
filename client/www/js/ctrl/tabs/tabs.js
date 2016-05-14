/**
 * 选项卡控制器
 */
angular.module('tabsCtrl',[])
.controller('tabsCtrl', function($scope, backend){
  backend.setUserId('57317e9595b335df532d574b');
  console.log('tabs控制器启动');
});