/* globals angular */
angular.module('marathonpacers.services')
  .factory('backgroundGeoLocationService', ['$interval','$rootScope', function ($interval,$rootScope) {
    'use strict';
    var watchId;

    return {
      initialize: function() {
            var bgGeo = window.BackgroundGeolocation;

            var callbackFn = function(location, taskId) {
                var coords = location.coords;
                var lat    = coords.latitude;
                var lng    = coords.longitude;
                $rootScope.$broadcast("positionchanged",location);
                bgGeo.finish(taskId);
            };

                    // This callback will be executed if a location-error occurs.  Eg: this will be called if user disables location-services.
            var failureFn = function(errorCode) {
                console.warn('- BackgroundGeoLocation error: ', errorCode);
            }

            bgGeo.on('location', callbackFn, failureFn);

            bgGeo.configure({
                // Geolocation config
                desiredAccuracy: 0,
                distanceFilter: 10,
                stationaryRadius: 50,
                locationUpdateInterval: 1000,
                fastestLocationUpdateInterval: 5000,

                // Activity Recognition config
                activityType: 'Fitness',
                activityRecognitionInterval: 5000,
                stopTimeout: 5
            }, function(state) {
                // This callback is executed when the plugin is ready to use.
                alert("Background Location Configured");
            });

      },
      start: function() {
          var bgGeo = window.BackgroundGeolocation;
          bgGeo.start();
      },
      stop: function() {
          var bgGeo = window.BackgroundGeolocation;
          bgGeo.stop();
      }

      
    };
  }]);
