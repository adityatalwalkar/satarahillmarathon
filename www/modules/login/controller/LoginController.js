angular.module('marathonpacers.login.controllers', [])

.controller('LoginController',  function ($scope, $timeout, $interval, $ionicPlatform, $state,$stateParams,FURL,Auth) {
  
  var ref = new Firebase(FURL);
  var userkey = "";
  var onLogin = function(error,authData)
  {
          //Utils.hide();
          if (error) {
          console.log("Login Failed!", error);
          
          } 
          else {

            console.log("Authenticated successfully with payload:", authData);
            $scope.isLoggedin = true;
            //$localStorage.email = authData.facebook.email;
            //console.log(authData.facebook.email);
            //$localStorage.userkey = authData.uid;
            $state.go('app.home');
            //return authData;
          }
  };

  $scope.signInWithFacebook = function () {
    console.log("Enviado");
    //Utils.show();
    Auth.login("facebook",onLogin);
  };

   $scope.signInWithTwitter = function () {
    console.log("Enviado");
    //Utils.show();
    Auth.login("twitter",onLogin);
  };

  $scope.signInWithGoogle = function () {
    console.log("Enviado");
    //Utils.show();
    Auth.login("google",onLogin);
  };

  $scope.activeruns = [
    { title: 'Home 1', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

