angular.module('authSer', [])
.factory('authSer', function($resource, configuration){
  return $resource(configuration.apiUrl+'api/auth', {}, {
      post: {
        method: 'post',
      },
      get: {
        method: 'get'
      }
    });
});