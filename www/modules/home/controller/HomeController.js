angular.module('marathonpacers.home.controllers', [])

.controller('HomeController', function($scope,speechService) {

  
	var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
   };

  $scope.tipOfDay = function(url) {
	  cordova.InAppBrowser.open(url,  options)
		
      .then(function(event) {
         // success
      })
		
      .catch(function(event) {
         // error
      });
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

