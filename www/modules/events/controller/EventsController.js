angular.module('marathonpacers.events.controllers', [])

.controller('EventsController', function($scope,$firebaseObject,$timeout,$ionicLoading,$firebaseArray,ionicMaterialInk, ionicMaterialMotion,FURL,Auth) {
   /*$timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 1000);

*/
    $ionicLoading.show({
          template: 'Loading Data .. please wait',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    var itemsRef = new Firebase(FURL + "trainingplans");
    $scope.plans = $firebaseArray(itemsRef);
    itemsRef.once('value',function(snapshot) {
                $ionicLoading.hide();
            }
        );

    $scope.getTrainingName = function(trainingplan)
    {
      return trainingplan.name;
    }
})

