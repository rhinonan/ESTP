/**
 * 选项卡控制器
 */
angular.module('tabsCtrl',[])
.controller('tabsCtrl', function($scope, backend){
  console.log('tabs控制器启动');
  backend.setUserId('57317e9595b335df532d574b');
});