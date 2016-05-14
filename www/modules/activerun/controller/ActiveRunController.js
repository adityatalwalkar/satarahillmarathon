angular.module('marathonpacers.activerun.controllers', [])

.controller('ActiveRunController', function($scope,speechService,geoLocationService,scheduledAnnouncementService,runnerFactory,pacerFactory,ionicMaterialInk, ionicMaterialMotion, $ionicSideMenuDelegate, $timeout, $interval,$state,$ionicSlideBoxDelegate,$firebaseArray, $firebaseObject,FURL,Auth,$ionicLoading) {
  


    $scope.stopRun = function () {
        console.log("stopping run");
        this.session.runner.stopRun();
        for(var i=0;i<this.session.pacers.length;i++)
          this.session.pacers[i].stopRun();  
        scheduledAnnouncementService.stop();
        geoLocationService.stop();
        if(window && window.plugins)
        window.plugins.insomnia.allowSleepAgain();

        if(typeof cordova != "undefined" && cordova.plugins.backgroundMode) 
          cordova.plugins.backgroundMode.disable();


        var itemsRef = new Firebase(FURL + "runs/" + Auth.getuid() );
        var runs = $firebaseArray(itemsRef);
        
        runs.$add(this.session.runner.getRun());        
        $state.go("app.home");
    };

    $scope.testRun = function() {
      this.session.runner.runTo(positions[this.session.runposition++ % 2]);
      //this.nextSlide();
    }

    

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
    
    $ionicLoading.show({
          template: 'Locating GPS .. please wait',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });

    $scope.session.runner = runnerFactory.createRunner();
    $scope.session.pacers = pacerFactory.createAllPacers();


    geoLocationService.start(onChange, gpsError);

    $scope.$on('lapchanged',function(event,data)      {
            console.log("ActiveRunController: Lap Changed " + data)
            if(data.distance != null)
            speechService.announceMessage(convertDecimal(data.distance,2) + " kilometers completed in " + toTimeString(data.duration,2) );
    });


    $scope.$on('pacerspeedchanged',function(event,data)      {
            console.log("ActiveRunController: Pacer " + data.pacerName +" changed speed to " + data.pace);
            if( 
                $scope.session.runner.pacerAhead != null && $scope.session.runner.pacerAhead.pacerName === data.pacerName ||
                $scope.session.runner.pacerBehind != null && $scope.session.runner.pacerBehind.pacerName === data.pacerName 
              )
              speechService.announceMessage( data.pacerName +" pacer has changed the pace  to " + data.pace + " mins per kilometer");
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
      console.log("Run Started");
      $scope.session.pacers = pacerFactory.createAllPacers(); 
      scheduledAnnouncementService.start(getAnnouncement);
      if(typeof cordova != "undefined" && cordova.plugins.backgroundMode) {  
        cordova.plugins.backgroundMode.setDefaults({ title:"PNB Metlife Satara Hill Half Marathon",text:"Run in progress"});
        cordova.plugins.backgroundMode.enable();
      }
      if(window && window.plugins)
        window.plugins.insomnia.keepAwake();
      speechService.announceMessage("Run Started");
      $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 1000);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

      $ionicLoading.hide();
    });

    function getAnnouncement()
    {
    var message = "";
        if($scope.session.runner.pacerAhead != null)
          message += getPacerAnnouncement($scope.session.runner.pacerAhead);
        if($scope.session.runner.pacerBehind != null)
          message += getPacerAnnouncement($scope.session.runner.pacerBehind);

        return message;
    }

    function getPacerAnnouncement(pacer) {
        var difference = pacer.distanceCovered - $scope.session.runner.distanceCovered;
        var absdifference = Math.floor(Math.abs(difference) * 1000);
        var distanceMessage ="";

        if(absdifference < 1000)
        {
          distanceMessage = absdifference + " meters"; 
        }
        else
        {
          var kms = Math.floor(absdifference/1000);
          var meters = Math.floor((absdifference - (kms * 1000)));
          distanceMessage = kms + " kilo meters and " + meters + " meters";
        }
        if(difference > 0)
          return pacer.pacerName + " pacer is ahead of you by " + distanceMessage;  
        else
          return pacer.pacerName + " pacer is behind you by " + distanceMessage;
    }



    function onChange(newPosition) {

        $scope.session.runner.runTo(newPosition);
        
        
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

