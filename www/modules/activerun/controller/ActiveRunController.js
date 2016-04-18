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
    $scope.session = {};

    startTimer();
    
    function startTimer () {
      $scope.session.duration = moment.duration(0);
      $scope.session.lapDuration = moment.duration(0);
      $scope.session.savedTime = new Date().getTime();

      $scope.session.elapsedTimer = $interval(function () {
        var difference = new Date().getTime() - $scope.session.savedTime; 
        $scope.session.duration.add(difference, 'ms');
        $scope.session.durationSeconds = $scope.session.duration.asSeconds();
        $scope.session.lapDuration.add(difference,'ms');
        $scope.session.lapDurationSeconds = $scope.session.lapDuration.asSeconds();
        $scope.session.savedTime = new Date().getTime();
        $scope.session.elapsed = getDurationString($scope.session.duration);
      }, 500);
    }


 function stopTimer ()
  {
      if (angular.isDefined($scope.session.elapsedTimer)) {
        $interval.cancel($scope.session.elapsedTimer);
        $scope.session.elapsedTimer = undefined;
      }
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

