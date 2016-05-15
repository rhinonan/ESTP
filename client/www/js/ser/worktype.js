angular.module('workTypeSer', [])
.factory('workTypeSer', function($resource, configuration){
  return {
    getWorkTypeInfo : $resource(configuration.apiUrl+'api/workType', {}, {
      list: {
        method: 'GET',
      }
    })
  };
});