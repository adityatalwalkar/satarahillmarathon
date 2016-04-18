angular.module('marathonpacers.activerun.controllers', [])

.controller('ActiveRunController', function($scope,speechService,ionicMaterialInk, ionicMaterialMotion, $ionicSideMenuDelegate, $timeout, $interval,$state) {
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
    $scope.session.elapsed ="Test";
    $scope.session.runTimer = new RunTimer();
    startTimer();
    

    //TODO: Need to figure out how this can go into RunTimer class
    function startTimer () {
      /* Initialize the Timer for the run */
      $scope.session.elapsedTimer = $interval(function () {
        /* Initialize the Timer for the run */
        $scope.session.runTimer.tick();
        //$scope.session.elapsed = runTimer.durationString();
      }, 500);
    }


 function stopTimer ()
  {
      
      //resetSession();
  }



  $scope.activeruns = [
    { title: 'Run 1', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

