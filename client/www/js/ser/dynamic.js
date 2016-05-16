angular.module('dynamicSer', [])
.factory('dynamicSer', function($resource, configuration){
  return {
    getDynamicInfo : $resource(configuration.apiUrl+'api/dynamic', {}, {
      multi: {
        method: 'GET',
        // isArray: true
      },
      byId: {
        method: 'GET'
      }
    }),
    postDynamicInfo : $resource(configuration.apiUrl+'api/dynamic', {}, {
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