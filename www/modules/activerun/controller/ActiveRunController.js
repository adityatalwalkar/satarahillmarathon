angular.module('marathonpacers.activerun.controllers', [])

.controller('ActiveRunController', function($scope,speechService,geoLocationService,runnerFactory,pacerFactory,ionicMaterialInk, ionicMaterialMotion, $ionicSideMenuDelegate, $timeout, $interval,$state,$ionicSlideBoxDelegate) {
  speechService.announceMessage("Run Started");


    $scope.stopRun = function () {
        console.log("stopping run");
        this.session.runner.stopRun();
        for(var i=0;i<this.session.pacers.length;i++)
          this.session.pacers[i].stopRun();  
        
        $state.go("app.home");
    };

    $scope.testRun = function() {
      this.session.runner.runTo(positions[this.session.runposition++ % 2]);
      //this.nextSlide();
    }

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 1000);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    /*Initialize Session */
    $scope.session = {runposition:0,runner:null,pacers:[],pacerupdates:[]};


    $scope.options = {
      loop: false,
      speed: 500,
    };

    $scope.data = {};
    
    $scope.$watch('data.slider', function(nv, ov) {
      $scope.slider = $scope.data.slider;
    });

    

    $scope.nextSlide = function() {
          $ionicSlideBoxDelegate.next();
    }
    
    
    $scope.session.runner = runnerFactory.createRunner();
    $scope.session.pacers = pacerFactory.createAllPacers();

    geoLocationService.start(onChange, gpsError);

    $scope.$on('lapchanged',function(event,data)      {
            console.log("ActiveRunController: Lap Changed " + data)
            if(!data.distance)
            speechService.announceMessage(convertDecimal(data.distance,2) + " kilometers completed in " + toTimeString(data.duration,2) );
    });


    $scope.$on('pacerspeedchanged',function(event,data)      {
            console.log("ActiveRunController: Pacer " + data.pacerName +" changed speed to " + data.pace)
            //speechService.announceMessage(data.pa + " kilometers completed in " + toTimeString(data.duration,2) );
            //speechService.announceMessage(convertDecimal(data.distance,2) + " kilometers completed in " + toTimeString(data.duration,2) );
    });

    $scope.$on('pacerdistanceupdated',function(event,data)      {

            $scope.session.pacerupdates.push(data);
            console.log("Update received for " + data.pacerName);
            //Wait until all updates are received
            if($scope.session.pacerupdates.length == $scope.session.pacers.length) 
            { 
                $scope.session.pacerupdates = []; 
                console.log("received all updates now calculating the nearest pacers");
                var oldPacerAhead = $scope.session.runner.pacerAhead;
                var oldPacerBehind = $scope.session.runner.pacerBehind;
                $scope.session.runner.pacerAhead = null;
                $scope.session.runner.pacerBehind = null;
                var pacerAheadDistance = 99999;
                var pacerBehindDistance = -99999;
                var pacerAheadChanged = false;
                var pacerBehindChanged = false;

                for(var i=0;i<$scope.session.pacers.length;i++)
                {
                    var pacer = $scope.session.pacers[i];
                    
                    var difference = pacer.distanceCovered - $scope.session.runner.distanceCovered;    
                    if(difference >= 0 && difference < pacerAheadDistance)
                    {
                        pacerAheadDistance = difference;
                        $scope.session.runner.pacerAhead = pacer;
                    }
                    if(difference < 0 && difference > pacerBehindDistance)
                    {
                        pacerBehindDistance = difference;
                        $scope.session.runner.pacerBehind = pacer;
                    }
               
                }

                if(oldPacerAhead == null)
                {
                  if($scope.session.runner.pacerAhead != null )
                      pacerAheadChanged = true; 
                } else {
                  if($scope.session.runner.pacerAhead != null  && $scope.session.runner.pacerAhead.pacerName != oldPacerAhead.pacerName)
                      pacerAheadChanged = true;
                }

                if(oldPacerBehind == null)
                {
                  if($scope.session.runner.pacerBehind != null )
                      pacerBehindChanged = true; 
                } else {
                  if($scope.session.runner.pacerBehind != null  && $scope.session.runner.pacerBehind.pacerName != oldPacerBehind.pacerName)
                      pacerBehindChanged = true;
                }                

                if(pacerAheadChanged)
                {
                  speechService.announceMessage($scope.session.runner.pacerAhead.pacerName + " pacer is now ahead of you by " + distancetoLongString(pacerAheadDistance));
                }

                if(pacerBehindChanged)
                {
                  speechService.announceMessage($scope.session.runner.pacerBehind.pacerName + " pacer is now behind you by " + distancetoLongString(pacerBehindDistance)); 
                }
            }
            else
            {
              console.log("Update received for " + data.pacerName);
            }
            
    });    

    $scope.$on('runstarted',function(event,data)      {
      $scope.session.pacers = pacerFactory.createAllPacers();   
    });

    function onChange(newPosition) {
        //$scope.session.runner.startRun();

        $scope.session.runner.runTo(newPosition);
        //$scope.session.runner.runTo(positions[$scope.session.runposition++ % 2]);
        
        
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

    
$scope.session.activeruns = [
          { title: 'Run 1', id: 1, dateTime : moment('2015-06-24 19:57:00', "YYYYMMDD").fromNow(),distance: 10,duration:getDurationString(moment(0).add(Math.random()*100000000,'ms')) },
          { title: 'Chill', id: 2, dateTime : moment('2015-06-24 19:57:00', "YYYYMMDD").fromNow(),distance: 5,duration:getDurationString(moment(0).add(Math.random()*100000000,'ms')) },
          { title: 'Dubstep', id: 3, dateTime : moment('2015-06-24 19:57:00', "YYYYMMDD").fromNow(),distance: 2,duration:getDurationString(moment(0).add(Math.random()*100000000,'ms')) },
          { title: 'Indie', id: 4, dateTime : moment('2015-06-24 19:57:00', "YYYYMMDD").fromNow(),distance: 5,duration:getDurationString(moment(0).add(Math.random()*100000000,'ms')) },
          { title: 'Rap', id: 5, dateTime : moment('2015-06-24 19:57:00', "YYYYMMDD").fromNow(),distance: 3,duration:getDurationString(moment(0).add(Math.random()*100000000,'ms')) },
          { title: 'Cowbell', id: 6, dateTime : moment('2015-06-24 19:57:00', "YYYYMMDD").fromNow(),distance: 15,duration:getDurationString(moment(0).add(Math.random()*100000000,'ms')) }
  ]     ;
})

