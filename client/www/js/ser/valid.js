angular.module('validSer', [])
.factory('validSer', function($ionicPopup){
  var result  = {
    valid: true,
    msg: ''
  };
  function count(o){
    var t = typeof o;
    var n;
    if(t == 'string'){
      return o.length;
    }else if(t == 'object'){
      n = 0;
      for(var i in o){
              n++;
      }
      return n;
    }
    return false;
  }
  function showPop(msg) {
    $ionicPopup.show({
      template: '<span style="text-align: center;display:block">'+msg+'</span>',
      title: '表单验证错误',
      buttons: [{
        text: '确定',
        type: 'button-assertive',
      }]
    });
  }
  return function(obj, len, regs) {
    var reg;
    var key;
    result.valid = true;
    if(count(obj) < len){
      result.valid = false;
      result.msg = '输入项目不能为空';
    }
    if(regs){
      for(key in regs){
        reg = new RegExp(regs[key].reg);
        if(!reg.test(obj[key])){
          result.valid = false;
          result.msg = regs[key].msg;
        } 
      }
    }
    if(!result.valid){
      showPop(result.msg);
    }
    return result;
  };
})


.factory('showPopSer', function($ionicPopup, $state,$timeout){
  return function (msg, err, fun) {
    var classname = 'balanced';
    var re ;
    if(err){
      classname = 'assertive';
    }
    re = $ionicPopup.show({
      template: '<span style="text-align: center;display:block">'+msg+'</span>',
      title: err ? '操作失败' : '操作成功',
      buttons: [{
        text: '确定',
        type: 'button-'+classname,
        onTap: fun
      }]
    });
    // if(!err){
    //   $timeout(function() {
    //     $ionicPopup.hide();
    //   }, 2000);
    // }
    return re;
  };
});