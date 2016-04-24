angular.module('marathonpacers.myruns.controllers', [])

.controller('MyRunsController', function($scope,ionicMaterialInk, ionicMaterialMotion, $ionicSideMenuDelegate, $timeout,FURL,$firebaseArray,Auth) {
  
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 1000);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    var itemsRef = new Firebase(FURL + "runs/" + Auth.getuid() );
    $scope.runs = $firebaseArray(itemsRef);

    $scope.getRelativeTime = function(datetime)
    {
        console.log("Get Ralative Time Called");
        return moment(datetime).fromNow();
    }

});

