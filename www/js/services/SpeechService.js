/* globals angular */
angular.module('marathonpacers.services')
  .factory('speechService', ['$interval', function ($interval) {
    'use strict';
    var watchId;
    
    return {
      start: function (getAnnouncement) {
        var settings = JSON.parse(window.localStorage['settings'] || '{"announcementFrequency": 5,"unit": "Kilometers"}');
        watchId = $interval(function () {
          
          //navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: true});
           var u = new SpeechSynthesisUtterance();
           u.text = getAnnouncement();
           u.lang = "en-US";
           speechSynthesis.speak(u); 
           if(settings.announceFormReminders)
           {
        	  var numberofForms = runningFormTips.length;
         	  var randomMessageIndex = Math.floor(Math.random() * numberofForms);
         	  var utterance = new SpeechSynthesisUtterance();
         	  utterance.text = runningFormTips[runningFormTips].message;
         	  utterance.lang = "en-US";
              speechSynthesis.speak(utterance);
        	   
           }

        }, settings.announcementFrequency*60*1000);
      },
      stop: function () {
        if (watchId) {
          $interval.cancel(watchId);
        }
      },
      announcePaceChange:function(newPacer) {
           var u = new SpeechSynthesisUtterance();
           u.text = "Pacer is now running with pace of " + newPacer + " minutes to kilometer";
           u.lang = "en-US";
           speechSynthesis.speak(u);         
      },
      announceMessage:function(message) {
           var u = new SpeechSynthesisUtterance();
           u.text = message;
           u.lang = "en-US";
           speechSynthesis.speak(u);         
      },
      announceFormReminder:function() {
    	  var numberofForms = runningFormTips.length;
    	  var randomMessageIndex = Math.floor(Math.random() * numberofForms);
    	  var u = new SpeechSynthesisUtterance();
    	  
          u.text = runningFormTips[randomMessageIndex].message;
          u.lang = "en-US";
          speechSynthesis.speak(u);         
      }
    };
  }]);
