/* globals angular */
angular.module('marathonpacers.services')
  .factory('scheduledAnnouncementService', ['$interval','$rootScope','speechService', function ($interval,$rootScope,speechService) {
    'use strict';
    var watchId;
    
    return {
      start: function (getAnnouncement) {
        
        watchId = $interval(function () {

           var text = getAnnouncement();
           speechService.announceMessage(text);

        
        }, $rootScope.settings.announcementFrequency*60*1000);
      },
      stop: function () {
        if (watchId) {
          $interval.cancel(watchId);
        }
      }
    };
  }]);
