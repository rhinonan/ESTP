angular.module('commentSer', [])
.factory('commentSer', function($resource, configuration){
  return $resource(configuration.apiUrl+'api/comment', {}, {
      post: {
        method: 'post',
      },
      get: {
        method: 'get'
      }
    });
});