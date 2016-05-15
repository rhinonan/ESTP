/**
 * 全局过滤器
 */
angular.module('filter',[])
.filter('dynamicTime', function () {
  return function (input) {
    var now = new Date();
    var time = new Date(input);
    console.log(now);
    console.log(time);
    var ms = now.getTime() - time.getTime();
    // if(ms < 60 * 60 * 1000){
    //   return ms/(60*60*1000)+'分钟以前';
    // }
    return ms;

  };
});