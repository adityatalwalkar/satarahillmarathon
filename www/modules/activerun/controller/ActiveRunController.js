angular.module('marathonpacers.activerun.controllers', [])

.controller('ActiveRunController', function($scope,speechService,geoLocationService,runnerFactory,pacerFactory,ionicMaterialInk, ionicMaterialMotion, $ionicSideMenuDelegate, $timeout, $interval,$state) {
  speechService.announceMessage("Run Started");


    $scope.stopRun = function () {
        console.log("stopping run");
        $state.go("app.home")
    };

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 1000);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    /*Initialize Session */
    $scope.session = {};

    
    
//    $scope.session.runner = runnerFactory.createRunner();
      $scope.session.runner =pacerFactory.createPacer();
    $scope.session.runner.startRun();
    //geoLocationService.start(onChange, gpsError);



    function onChange(newPosition) {
//      $scope.session.runner.startRun();
  //    $scope.session.runner.runTo(newPosition.coords);
    }



    function gpsError(positionError) {
      if(positionError.code == positionError.PERMISSION_DENIED)
      {
        $scope.session.showMessage = false;
        $scope.session.errorMessage = "Error occured while getting your location.";
      }
      if(positionError.code == positionError.POSITION_UNAVAILABLE)
      {
        $scope.session.showMessage = false;
        $scope.session.errorMessage = "The application could not connect to GPS.";
      }
      if(positionError.code == positionError.TIMEOUT)
      {
        $scope.session.showMessage = false;
        $scope.session.errorMessage = "The application could not connect to GPS.";
      }
    }

})

