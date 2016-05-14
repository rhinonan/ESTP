/**
 * 基础服务
 */
 angular.module('backend',[])
 .factory('backend', function($window) {
   return {
    setUserId: function (userId) {
      $window.sessionStorage.setItem('userId', userId);
    },
    getUserId: function () {
      return $window.sessionStorage.getItem('userId');
    },
    isLogin: function () {
      if($window.sessionStorage.getItem('userId')){
        return true;
      }else{
        return false;
      }
    },
    clear: function () {
      return $window.sessionStorage.clear();
    }
  };
 });