angular.module('requireSer', [])
.factory('requireSer', function($resource, configuration){
  return $resource(configuration.apiUrl+'api/project', {}, {
      post: {
        method: 'post',
      },
      get: {
        method: 'get'
      }
    });
});