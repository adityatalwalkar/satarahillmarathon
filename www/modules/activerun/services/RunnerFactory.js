/* globals angular */
angular.module('marathonpacers.activerun.services')
  .factory('runnerFactory', ['$interval', function ($interval) {
      function Runner() {
          $currentscope = this;
          this.duration = moment.duration(0);
          this.startRun = function(startTime)
          {

            if(startTime == undefined || startTime == null)
                startTime = 0;
            this.duration = moment.duration(startTime);
            //this.lapDuration = moment.duration(startTime);
            this.savedTime = new Date().getTime();
            this.currentPace = 0;
            this.distanceCovered = 0; 
            this.lapDistance = 0;

            this.elapsedTimer = $interval(this.tick, 500);

            //geoLocationService.start(this.runTo, this.gpsError);

          }

          this.tick = function()
          {
                /* Initialize the Timer for the run */
                var difference = new Date().  getTime() - $currentscope.savedTime; 
                $currentscope.duration.add(difference, 'ms');
                //$currentscope.lapDuration.add(difference, 'ms');
                $currentscope.savedTime = new Date().getTime();  
          }

          this.runTo = function(newPosition)
          {

            if (!this.prevCoord) {
                   this.prevCoord = {latitude:newPosition.latitude,longitude:newPosition.longitude};
            }
            else
                this.prevCoord = this.currentCoord;
            this.currentCoord = newPosition;
            this.calculateDistanceCovered();
            this.calculatePaces();
          }

          this.calculateDistanceCovered = function()
          {
            this.distanceCovered += calculateDistance(this.prevCoord,this.currentCoord);
            //this.lapDistance += tempDistance;
          }

          this.calculatePaces = function() {
            var KMS_TO_KMH = 3600;
            if (this.duration.asSeconds() > 0) {
                this.averageSpeed = (this.distanceCovered / this.duration.asSeconds()) * KMS_TO_KMH;
                

                if(this.averageSpeed > 0)
                  this.averagePace = 60/this.averageSpeed;
                else
                  this.averagePace = 0;

              /*  if(this.lapDuration.asSeconds() > 0)
                    this.lapSpeed = (this.lapDistance / this.lapDuration.asSeconds()) * KMS_TO_KMH;
                */
                this.currentSpeed = this.currentCoord.speed * 3.6;
                if(this.currentSpeed > 0)
                  this.currentPace = 60/this.currentSpeed;
                else
                  this.currentPace = 0;
              }

          }

          this.runningDurationDisplay = function() {
            return getDurationString(this.duration);
          }

          this.currentPaceDisplay = function() {
            return this.currentPace;
          }

          this.distanceCoveredDisplay = function() {
            return this.distanceCovered;
          }
      }

      return {
        createRunner:function()
        {
          return new Runner();
        }
      } 


  }]);
