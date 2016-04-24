angular.module('marathonpacers.login.controllers', [])

.controller('LoginController',  function ($scope, $timeout, $interval, $ionicPlatform, $state,$stateParams,$rootScope,FURL,Auth) {
  
  var ref = new Firebase(FURL);
  var userkey = "";


  $scope.$on('userloggedinsuccessfully',function(event,data)      {
            console.log("User Logged in Successfully " + data.displayName);
            $rootScope.isLoggedin = true;
            $rootScope.LoggedInAs = "user";
            $rootScope.displayName = data.displayName;
            $state.go("app.home");
  });

  $scope.signInAsGuest = function () {
          
          $rootScope.isLoggedin = true;
          $rootScope.LoggedInAs = "guest";
          $rootScope.displayName = "Guest";
          $state.go("app.home");
  
  };

  $scope.signInWithFacebook = function () {
    Auth.login("facebook");
  };


   $scope.signInWithTwitter = function () {
    Auth.login("twitter");
  };

  $scope.signInWithGoogle = function () {
    Auth.login("google");
  };

  })

