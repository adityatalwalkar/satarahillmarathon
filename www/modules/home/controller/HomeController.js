angular.module('marathonpacers.home.controllers', [])

.controller('HomeController', function($scope,$firebaseObject,$ionicLoading,FURL,Auth,$rootScope) {



  
  var itemsRef = new Firebase(FURL + "tipOfDay");

  itemsRef.once('value',function(snapshot) {
                $ionicLoading.hide();
            }
        );

  $scope.tipOfDay= $firebaseObject(itemsRef);

  $rootScope.settings = JSON.parse(window.localStorage['settings'] || '{"announcementFrequency": 5,"unit": "Kilometers","announceDistance":true,"announcelapPace":true}');

  $ionicLoading.show({
          template: 'Loading Data .. please wait',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });   

	var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
   };

  $scope.openUrl = function(url) {
	  cordova.InAppBrowser.open(url,  options)
		
      .then(function(event) {
         // success
      })
		
      .catch(function(event) {
         // error
      });
  };

})

