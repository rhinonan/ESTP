// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 
  'config',
  'ngResource',
  // 'ngCordova',
  'tabsCtrl',
  'centerCtrl',
  'loginCtrl',
  'dynamicCtrl',
  'activityCtrl',
  'topicCtrl',
  'requireCtrl',
  'backend',
  'userSer',
  'dynamicSer',
  'workTypeSer',
  'commentSer',
  'requireSer',
  'activitySer',
  'authSer',
  'validSer',
  'topicSer',
  'filter'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    controller: 'tabsCtrl',
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dynamic', {
    url: '/dynamic',
    views: {
      'tab-dynamic': {
        templateUrl: 'templates/dynamic/index.html',
        controller: 'dynamicCtrl'
      }
    }
  })
  .state('tab.dynamic-detail', {
    url: '/dynamic/:dynamicId',
    views: {
      'tab-dynamic': {
        templateUrl: 'templates/dynamic/dynamicDetail.html',
        controller: 'dynamicDetailCtrl'
      }
    }
  })
  .state('tab.find', {
    url: '/find',
    cache: false,
    views: {
      'tab-find': {
        templateUrl: 'templates/tabs-find.html',
        controller: 'tabsCtrl'
      }
    }
  })  
  .state('tab.activity', {
    url: '/activity',
    views: {
      'tab-find': {
        templateUrl: 'templates/activity/list.html',
        controller: 'activityCtrl'
      }
    }
  })  
  .state('tab.activity-detail', {
    url: '/activity/:activityId',
    views: {
      'tab-find': {
        templateUrl: 'templates/activity/detail.html',
        controller: 'activityDetailCtrl'
      }
    }
  })  
  .state('tab.topic', {
    url: '/topic',
    views: {
      'tab-find': {
        templateUrl: 'templates/topic/list.html',
        controller: 'topicCtrl'
      }
    }
  })  
  .state('tab.topic-detail', {
    url: '/topic/:topicId',
    views: {
      'tab-find': {
        templateUrl: 'templates/topic/detail.html',
        controller: 'topicDetailCtrl'
      }
    }
  })
  .state('tab.require', {
    url: '/require',
    views: {
      'tab-require': {
        templateUrl: 'templates/require/list.html',
        controller: 'requireCtrl'
      }
    }
  })  
  .state('tab.require-detail', {
    url: '/require/:requireId',
    views: {
      'tab-require': {
        templateUrl: 'templates/require/detail.html',
        controller: 'requireDetailCtrl'
      }
    }
  })  
  .state('tab.post-require', {
    url: '/postRequire',
    views: {
      'tab-center': {
        templateUrl: 'templates/require/post.html',
        controller: 'postRequireCtrl'
      }
    }
  })  
  .state('tab.post-dynamic', {
    url: '/postDynamic',
    views: {
      'tab-center': {
        templateUrl: 'templates/dynamic/post.html',
        controller: 'postDynamicCtrl'
      }
    }
  })
  .state('tab.post-activity', {
    url: '/postActivity',
    views: {
      'tab-center': {
        templateUrl: 'templates/activity/post.html',
        controller: 'postActivityCtrl'
      }
    }
  })
  .state('tab.post-topic', {
    url: '/postTopic',
    views: {
      'tab-center': {
        templateUrl: 'templates/topic/post.html',
        controller: 'postTopicCtrl'
      }
    }
  })



  .state('tab.center', {
    url: '/center',
    cache: false, 
    views: {
      'tab-center': {
        templateUrl: 'templates/center/index.html',
        controller: 'centerCtrl'
      }
    }
  })  
  .state('tab.userInfo', {
    url: '/center/:userId',
    views: {
      'tab-center': {
        templateUrl: 'templates/center/userInfo.html',
        controller: 'userInfoCtrl'
      }
    }
  })  
  .state('tab.changePwd', {
    url: '/center/change/changePwd',
    views: {
      'tab-center': {
        templateUrl: 'templates/center/changePwd.html',
        controller: 'changePwdCtrl'
      }
    }
  })
  .state('tab.changeInfo', {
    url: '/center/change/changeInfo',
    views: {
      'tab-center': {
        templateUrl: 'templates/center/changeInfo.html',
        controller: 'changeInfoCtrl'
      }
    }
  })
  .state('login', {
    url: '/login',
    controller: 'loginCtrl',
    templateUrl: 'templates/login/login.html',
  })
  .state('register', {
    url: '/register',
    controller: 'registerCtrl',
    templateUrl: 'templates/login/register.html',
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/center');

});
