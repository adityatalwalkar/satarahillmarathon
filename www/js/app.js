// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('marathonpacers', ['ionic','ionic-material','marathonpacers.services', 'marathonpacers.controllers','marathonpacers.home.controllers','marathonpacers.activerun.controllers','marathonpacers.myruns.controllers','marathonpacers.myruns.detail.controllers','marathonpacers.runningform.controllers','marathonpacers.login.controllers','marathonpacers.activerun.services','marathonpacers.settings.controllers','marathonpacers.trainingplan.controllers','marathonpacers.events.controllers','marathonpacers.events.detail.controllers','firebase','nvd3'])
.constant('FURL', 'https://satara-hill-marathon.firebaseio.com/')
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
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
  

var authenticated = ['$q', 'Auth', '$state','$timeout',function ($q, Auth,$state,$timeout) {
    var deferred = $q.defer();

    if (Auth.signedIn()) {
       deferred.resolve();
    } else {
      $timeout(function() {
          // This code runs after the authentication promise has been rejected.
          // Go to the log-in page
          $state.go('login')
        })
     deferred.reject();
      
    }
    return deferred.promise;
  }];



  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
    resolve: { authenticated: authenticated }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'modules/home/view/home.html',
        controller: 'HomeController'
      }
    }
  })

  .state('app.myruns', {
    url: '/myruns',
    views: {
      'menuContent': {
        templateUrl: 'modules/myruns/view/myruns.html',
        controller: 'MyRunsController'
      }
    }
  })

  .state('app.myruns.detail', {
    url: '/detail/:runId',
    views: {
      'menuContent@app': {
        templateUrl: 'modules/myruns/view/rundetail.html',
        controller: 'RunDetailsController'
      }
    }
  })

.state('app.runningform', {
    url: '/runningform',
    views: {
      'menuContent': {
        templateUrl: 'modules/runningform/view/runningform.html',
        controller: 'RunningFormController'
      }
    }
  })

.state('app.trainingplan', {
    url: '/trainingplan',
    views: {
      'menuContent': {
        templateUrl: 'modules/trainingplan/view/trainingplan.html',
        controller: 'TrainingPlanController'
      }
    }
  })

.state('app.events', {
    url: '/events',
    views: {
      'menuContent': {
        templateUrl: 'modules/events/view/events.html',
        controller: 'EventsController'
      }
    }
  })

.state('app.events.detail', {
    url: '/detail/:eventId',
    views: {
      'menuContent@app': {
        templateUrl: 'modules/events/view/eventdetail.html',
        controller: 'EventDetailsController'
      }
    }
  })


.state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'modules/settings/view/settings.html',
        controller: 'SettingsController'
      }
    }
  })


  .state('app.activerun', {
    url: '/activerun',
    views: {
      'menuContent': {
        templateUrl: 'modules/activerun/view/activerun.html',
        controller: 'ActiveRunController'
      }
    }
  })

  .state('login', {
          url: '/login',
          templateUrl: 'modules/login/view/login.html',
          controller: 'LoginController'
        })
      ;


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
