angular.module('activitySer', [])
.factory('activitySer', function($resource, configuration){
  return $resource(configuration.apiUrl+'api/activity', {}, {
      post: {
        method: 'post',
      },
      get: {
        method: 'get'
      }
    });
});