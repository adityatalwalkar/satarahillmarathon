/* globals angular */
angular.module('marathonpacers.services')
  .factory('geoLocationService', ['$interval', function ($interval) {
    'use strict';
    var watchId;

    return {
      start: function (success, error) {
        watchId = $interval(function () {
          
          navigator.geolocation.watchPosition(success, error, {enableHighAccuracy: true,maximumAge:3000,timeout:5000});
          //alert('watching');
        }, 5000);
      },
      stop: function () {
        if (watchId) {
          $interval.cancel(watchId);
        }
      }
    };
  }]);
