
angular.module('dynamicCtrl',[])
.controller('dynamicCtrl', function($scope, backend, userSer, $state, dynamicSer, commentSer){
  function _init() {
    $scope.users = [];
    $scope.dynamics = [];
    $scope.loginState = backend.isLogin();
    dynamicSer.getDynamicInfo.multi({
      userId: backend.getUserId(),
      type: 'multi'
    }, function (info) {
      $scope.dynamics = info.data;
      for(var i =0 ;i < info.data.length; i++){
        getSingleUser(info.data[i].userId);
        getCommentCount(info.data[i]._id, i);
      }
    }, function (info) {
      console.log(info.data);
    });
  }
  _init();

  $scope.doRefresh = function() {
    dynamicSer.getDynamicInfo.multi({
      type: 'multi'
    }, function (info) {
      $scope.activityList = info.data;
      $scope.$broadcast('scroll.refreshComplete');
    }, function (info) {
      
    });
  };


  $scope.login = function() {
    $state.go('login',{});
  };


  $scope.goUserInfo = function() {
    $state.go('tab.userInfo',{
      userId: backend.getUserId()
    });
  };
  

  $scope.logoOut = function() {
    $scope.loginState = false;
    backend.clear();
  };


  $scope.praise = function(index) {
    $scope.dynamics[index].ifPraise = true;  
    $scope.dynamics[index].praise++;  
    dynamicSer.postDynamicInfo.changeInfo({
      type:'praise',
      praise: true,
      dynamicId: $scope.dynamics[index]._id
    }, function() {
      
    });
  };


  $scope.showCommentForm = function(index) {
    $scope.dynamics[index].showComment = $scope.dynamics[index].showComment ? false: true ;
  };


  $scope.subimtComment = function(index) {
    commentSer.post({
      type: 'add',
      itemId: $scope.dynamics[index]._id,
      userId: backend.getUserId(),
      content: $scope.dynamics[index].tempComment
    }, function (data) {
      $scope.dynamics[index].showComment = false;
      $scope.dynamics[index].tempComment = '';
      $scope.dynamics[index].comment ++;
    });
  };


  $scope.goDetail = function (id) {
    console.log(id);
    $state.go('tab.dynamic-detail',{
      dynamicId: id
    });
  };

  function getSingleUser(userId) {
    userSer.getUserInfo.byId({
      userId: userId,
      type: 'id'
    }, function (info) {
      $scope.users.push(info.data);
    });
  }


  function getCommentCount(itemId,index) {
    commentSer.get({
      type: 'appoint',
      itemId: itemId
    }, function (info) {
      $scope.dynamics[index].comment = info.data.number;
    });
  }
})



.controller('dynamicDetailCtrl',  function($scope,  commentSer, $stateParams, dynamicSer, userSer, backend){
  function _init() {
    dynamicSer.getDynamicInfo.byId({
      type: 'id',
      dynamicId: $stateParams.dynamicId
    }, function (info) {
      $scope.dynamic = info.data;


      userSer.getUserInfo.byId({
        userId: info.data.userId,
        type: 'id'
      }, function (info) {
        $scope.userInfo = info.data;
      }, function (info) {
        console.log(info.data);
      });


    }, function (info) {
      
    });


    commentSer.get({
      type: 'itemId',
      itemId: $stateParams.dynamicId
    }, function (info) {
      $scope.comments = info.data;
    }, function (info) {
      
    });

    $scope.buttonText = '添加一条评论';
    $scope.showCommentForm = false;
    $scope.temp = {};
  }
  _init();


  $scope.showComment = function () {
    if($scope.showCommentForm){
      commentSer.post({
        type: 'add',
        content: $scope.temp.tempComment,
        userId: backend.getUserId(),
        itemId: $stateParams.dynamicId,
      }, function (info) {
        $scope.comments.push(info.data);
      }, function (info) {
        
      });
    }
    $scope.showCommentForm = $scope.showCommentForm ? false : true;
    $scope.buttonText = '提交';

  };

  $scope.closeComment = function() {
    $scope.showCommentForm = false;
  };
})

.controller('postDynamicCtrl',function($scope, workTypeSer, $ionicHistory,$state, $timeout, backend, dynamicSer, validSer, showPopSer){
 var valid = {};
 var form = {};

 function _init() {
   $scope.dynamic = {};

 }
 _init();


 $scope.submit = function () {
   var pro;
   valid = validSer($scope.dynamic, 2);
   if(!valid.valid){
     return false;
   }else{
     angular.copy($scope.dynamic,form);
     form.type = 'add';
     form.userId = backend.getUserId();
     dynamicSer.postDynamicInfo.post(form, function () {
       pro = showPopSer('发布成功');
       pro.then(function () {
         $state.go('tab.center', {});
       });
     }, function () {
       showPopSer('发布失败',true);
     });
   }
 }; 

    $scope.back = function() {
      $ionicHistory.goBack();
    };
}); 
