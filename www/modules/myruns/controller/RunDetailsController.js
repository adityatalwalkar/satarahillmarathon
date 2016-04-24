angular.module('marathonpacers.myruns.detail.controllers', [])

.controller('RunDetailsController', function($scope,ionicMaterialInk, ionicMaterialMotion, $ionicSideMenuDelegate, $timeout,$stateParams,FURL,$firebaseObject,Auth) {

    //alert($stateParams.runId);  
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 1000);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

   $scope.runId = $stateParams.runId;
   var itemsRef = new Firebase(FURL + "runs/" + Auth.getuid()  + "/" + $scope.runId);
   $scope.runDetails = $firebaseObject(itemsRef);
   

  $scope.getLapDataForChart = function()
  {
    return [{
        key:"Laps",
        values:$scope.runDetails.laps
    }];
  }

  $scope.displayPace = function(pace)
  {
    return getShortPaceFromDecimal(pace);
  }

  $scope.options = {
            chart: {
                type: 'discreteBarChart',
                height: 300,
                margin : {
                    top: 20,
                    right: 10,
                    bottom: 20,
                    left: 10
                },
                color:['#E65100'],
                x: function(d){return d.name;},
                y: function(d){return convertDecimal(d.lapDurationSeconds / 60,2);},
                showValues: false,
                xAxis: {
                    axisLabel: 'Laps'
                },
                yAxis: {
                    axisLabel: 'Time Taken',
                    axisLabelDistance: -10
                }
            }
        };

        
});

