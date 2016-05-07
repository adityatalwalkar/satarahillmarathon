/* globals angular */
angular.module('marathonpacers.activerun.services')
  .factory('runnerFactory', ['$interval','$rootScope', function ($interval,$rootScope) {
      function Runner() {
          var $currentscope = this;
          this.duration = moment.duration(0);
          this.lapDuration = moment.duration(0);
          this.laps = [];
          this.isRunning = false;
          this.pacerAhead = null;
          this.pacerBehind = null;
          
          this.startRun = function(startTime)
          {

            if(startTime == undefined || startTime == null)
                startTime = 0;
            this.duration = moment.duration(startTime);
            this.lapDuration = moment.duration(startTime);
            this.savedTime = new Date().getTime();
            this.startTime = new Date().getTime();
            this.currentPace = 0;
            this.currentLap = 0;
            this.distanceCovered = 0; 
            this.lapDistance = 0;
            this.isRunning = true;
            this.averageSpeed = 0;
            this.averagePace = 0;
            this.lapSpeed = 0;
            this.lapPace = 0;
            this.runTimer = $interval(this.tick, 500);

            $rootScope.$broadcast("runstarted",null);

            //geoLocationService.start(this.runTo, this.gpsError);

          }

          this.tick = function()
          {
                /* Initialize the Timer for the run */
                var difference = new Date().  getTime() - $currentscope.savedTime; 
                $currentscope.duration.add(difference, 'ms');
                $currentscope.lapDuration.add(difference, 'ms');
                $currentscope.savedTime = new Date().getTime();  
          }

          this.runTo = function(newPosition)
          {

            if (!this.prevPosition) {
                   this.prevPosition  = {coords:{latitude:newPosition.coords.latitude,longitude:newPosition.coords.longitude}};
            }
            else
                this.prevPosition = this.currentPosition;
            this.currentPosition = newPosition;
            this.currentSpeed = newPosition.speed * 3.6;

            if(this.isRunning)
            {
                this.calculateDistanceCovered();
                this.calculatePaces();

                var tempLap = Math.floor(this.distanceCovered);
                
                if(tempLap != this.currentLap)
                {
                    this.currentLap = tempLap;
                    var lapTime = this.lapDuration.asSeconds();
                    this.saveLap();
                    $rootScope.$broadcast("lapchanged",{distance:this.distanceCovered,duration:lapTime});
                }
            }
            else
            {
              this.startRun();
            }
            return 0;
          }

          this.saveLap = function() {
            var lap = new Object();
            lap.name =  (this.laps.length + 1);
            lap.coords = this.currentPosition.coords;
            lap.durationSeconds = this.duration.asSeconds();
            lap.lapDurationSeconds = this.lapDuration.asSeconds();
            lap.duration = getDurationString(this.duration);
            lap.lapDuration = getDurationString(this.lapDuration);
            lap.lapDistance = convertDecimal(this.lapDistance,2);
            lap.totalDistance = convertDecimal(this.distanceCovered,2);
            lap.lapSpeed = this.lapSpeed;
            lap.lapPace = 0;
            if(this.lapSpeed > 0 ) 
                this.lapPace = speedToPace(this.lapSpeed);
            this.laps.push(lap);
            this.lapDuration = moment.duration(0);
            this.lapDistance = 0;
          }

          this.calculateDistanceCovered = function()
          {
            var tempDistance = calculateDistance(this.prevPosition.coords,this.currentPosition.coords);
            this.distanceCovered += tempDistance;
            this.lapDistance += tempDistance;
          }

          this.calculatePaces = function() {
            var KMS_TO_KMH = 3600;
            if (this.duration.asSeconds() > 0) {

                /*Calculate Average Speed for entire run*/
                this.averageSpeed = calculateSpeed(this.distanceCovered,this.duration.asSeconds());             
                this.averagePace = speedToPace(this.averageSpeed);
                
                /*Calculate Lap Speed */
                this.lapSpeed = calculateSpeed(this.lapDistance,this.lapDuration.asSeconds())
                              
                this.currentPace = speedToPace(this.currentSpeed);
                
              }

          }

          this.stopRun = function()
          {
            this.saveLap();

            if (angular.isDefined(this.runTimer)) {
                $interval.cancel(this.runTimer);
                this.runTimer = undefined;
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

          this.getRun = function() {
              return {
                duration:getDurationString(this.duration),
                distance:convertDecimal(this.distanceCovered,2),
                datetime: this.startTime,
                averageSpeed:convertDecimal(this.averageSpeed,2),
                averagePace:convertDecimal(this.averagePace,2),
                laps:this.laps
              }

          }
      }

      return {
        createRunner:function()
        {
          return new Runner();
        }
      } 


  }]);
