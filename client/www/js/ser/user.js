angular.module('userSer', [])
.factory('userSer', function($resource, configuration){
  return {
    getUserInfo : $resource(configuration.apiUrl+'api/users', {}, {
      byId: {
        method: 'GET',
      }
    })
  };
});