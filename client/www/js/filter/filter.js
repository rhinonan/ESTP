/**
 * 全局过滤器
 */
angular.module('filter',[])
.filter('reverse', function () {
return function(items) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.reverse();

    return filtered;
  };
});