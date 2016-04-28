/* globals angular */
angular.module('marathonpacers.activerun.services')
  .factory('pacerFactory', ['$interval','$rootScope', function ($interval,$rootScope) {
      function Pacer(pacerName,paceChart) {
          var $currentscope = this;
          this.pacerName = pacerName;
          this.paceChart = paceChart;
          this.duration = moment.duration(0);

          

          this.startRun = function(startTime)
          {

            if(startTime == undefined || startTime == null)
                startTime = 0;
            this.duration = moment.duration(startTime);
           // this.lapDuration = moment.duration(startTime);
            this.savedTime = new Date().getTime();
            this.currentPace = 0;
            this.distanceCovered = 0; 
            this.lapDistance = 0;


            this.runTimer = $interval(this.tick, 10000);
            console.log( pacerName + " pacer started running");

            //geoLocationService.start(this.runTo, this.gpsError);

          }

          this.stopRun = function()
          {

            if (angular.isDefined(this.runTimer)) {
                $interval.cancel(this.runTimer);
                this.runTimer = undefined;
            }

          }

          this.tick = function()
          {
                /* Initialize the Timer for the run */
                var difference = new Date().  getTime() - $currentscope.savedTime; 
                $currentscope.duration.add(difference, 'ms');
             //   $currentscope.lapDuration.add(difference, 'ms');
                $currentscope.savedTime = new Date().getTime();  
                $currentscope.calculateDistanceCovered($currentscope);
                $currentscope.calculatePaces($currentscope);
          }

          

          this.calculateDistanceCovered = function(pacer)
          {
            
            var lastPacerLap = pacer.currentLap;      
            
            //$scope.pacerLap = 0;
            if(pacer.duration.asSeconds() > 0)
            {
                var pacerDistance = 0;
                var remainingDuration = pacer.duration.asSeconds() / 60;
                var i = 0;
                while(remainingDuration > 0 && i < pacer.paceChart.length)
                {
                    pacer.currentLap = i;
                    var lap = paceChart[i];
                    if(remainingDuration > lap.pace * lap.distance)
                    {
                      pacerDistance += lap.distance;
                    }
                    else
                      pacerDistance += remainingDuration / lap.pace;
                    remainingDuration = remainingDuration - (lap.pace * lap.distance);
                    i++;
                }

                pacer.distanceCovered = pacerDistance;
                $rootScope.$broadcast("pacerdistanceupdated",{pacerName:pacer.pacerName,distanceCovered:pacer.distanceCovered,pacer:pacer});
                if(lastPacerLap != pacer.currentLap && pacer.currentLap > 0)
                    $rootScope.$broadcast("pacerspeedchanged",{pacerName:pacer.pacerName,pace:pacer.paceChart[pacer.currentLap].pace});

            }
            else
              return;
            
          }



          this.calculatePaces = function(pacer) {
            var KMS_TO_KMH = 3600;
            if (pacer.duration.asSeconds() > 0) {
                pacer.averageSpeed = (pacer.distanceCovered / pacer.duration.asSeconds()) * KMS_TO_KMH;
                

                if(pacer.averageSpeed > 0)
                  pacer.averagePace = 60/pacer.averageSpeed;
                else
                  pacer.averagePace = 0;

                pacer.currentPace = pacer.paceChart[pacer.currentLap].pace;
                //pacer.currentPace = speedToPace(this.currentSpeed); 

              /*  if(this.lapDuration.asSeconds() > 0)
                    this.lapSpeed = (this.lapDistance / this.lapDuration.asSeconds()) * KMS_TO_KMH;
                
                this.currentSpeed = this.currentCoord.speed * 3.6;
                if(this.currentSpeed > 0)
                  this.currentPace = 60/this.currentSpeed;
                else
                  this.currentPace = 0;*/
              }

          }
          

          this.runningDurationDisplay = function() {
            return getDurationString(this.duration);
          }

          this.currentPaceDisplay = function() {
            return getShortPaceFromDecimal(this.currentPace);
          }

          this.distanceCoveredDisplay = function() {
            return convertDecimal(this.distanceCovered,2);
          }
      }

      return {
        createAllPacers:function()
        {
          var pacers = []
          for(i=0;i<initialPacers.length;i++)
          {
            var pacer = new Pacer(initialPacers[i].name,initialPacers[i].laps);
            pacers.push(pacer);
            pacer.startRun();

          }
          return pacers;
        }
      } 


  }]);
