angular.module('marathonpacers.events.detail.controllers', [])

.controller('EventDetailsController', function($scope,ionicMaterialInk, ionicMaterialMotion, $ionicSideMenuDelegate, $timeout,$stateParams,FURL,$firebaseObject,Auth) {

    //alert($stateParams.runId);  
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 1000);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

   $scope.eventId = $stateParams.eventId;


   var itemsRef = new Firebase(FURL + "trainingplandetails/" + $scope.eventId);
   $scope.eventDetails = $firebaseObject(itemsRef);
   
   $scope.enroll = function()
   {
		alert("Enrolling into " + $scope.eventId);   	
   }
      


        
});

