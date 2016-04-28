/* globals angular */
angular.module('marathonpacers.services')
  .factory('speechService', ['$interval', function ($interval,$rootScope) {
    'use strict';
    var watchId;
    
    return {
      
      announceMessage:function(message) {
           var u = new SpeechSynthesisUtterance();
           u.text = message;
           u.lang = "en-US";
           speechSynthesis.speak(u);         
      }
    };
  }]);
