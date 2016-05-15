angular.module('topicSer', [])
.factory('topicSer', function($resource, configuration){
  return $resource(configuration.apiUrl+'api/topic', {}, {
      post: {
        method: 'post',
      },
      get: {
        method: 'get'
      }
    });
});