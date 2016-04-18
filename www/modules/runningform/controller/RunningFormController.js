angular.module('marathonpacers.runningform.controllers', [])

.controller('RunningFormController', function($scope,ionicMaterialInk, ionicMaterialMotion, $ionicSideMenuDelegate, $timeout) {
  
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 1000);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();


  $scope.activeruns = [
    { title: 'Run 1', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

