angular.module('userSer', [])
.factory('userSer', function($resource, configuration){
  return {
    getUserInfo : $resource(configuration.apiUrl+'api/users', {}, {
      byId: {
        method: 'GET',
      }
    }),
    postUserInfo : $resource(configuration.apiUrl+'api/users', {}, {
      changePwd: {
        method: 'POST',
      },
      changeInfo: {
        method: 'POST',
      },
      login: {
        method: 'POST',
      },
      post: {
        method: 'POST',
      }
    })
  };
});