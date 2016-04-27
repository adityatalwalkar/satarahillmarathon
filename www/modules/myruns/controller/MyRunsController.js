angular.module('marathonpacers.myruns.controllers', [])

.controller('MyRunsController', function($scope,ionicMaterialInk, ionicMaterialMotion, $ionicSideMenuDelegate, $ionicLoading,$timeout,FURL,$firebaseArray,Auth) {
  
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 1000);


    $ionicLoading.show({
          template: 'Loading Data .. please wait',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    var itemsRef = new Firebase(FURL + "runs/" + Auth.getuid() );
    $scope.runs = $firebaseArray(itemsRef);
    itemsRef.once('value',function(snapshot) {
                $ionicLoading.hide();
            }
        );

    $scope.getRelativeTime = function(datetime)
    {
        console.log("Get Ralative Time Called");
        return moment(datetime).fromNow();
    }

});

