function getDurationString(duration) {
      var hours = padTime(duration.get('hours'));
      var minutes = padTime(duration.get('minutes'));
      var seconds = padTime(duration.get('seconds'));
      if (hours === "00") {
        return  minutes + ":" + seconds;
      } else {
        return hours + ":" + minutes + ":" + seconds;
      }
    }

function padTime(val) {
      if (val < 10) {
        return "0" + val;
      }
      return val;
    }


/* Calculate Distance between two GPS positions */
function calculateDistance(starting, ending) {
      var KM_RATIO = 6371;
      try {      
        var dLat = toRad(ending.latitude - starting.latitude);
        var dLon = toRad(ending.longitude - starting.longitude);
        var lat1Rad = toRad(starting.latitude);
        var lat2Rad = toRad(ending.latitude);
        
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = KM_RATIO * c;
        //$scope.pacerDistance = calculatePacerDistance();
        return d;
      } catch(e) {
        return -1;
      }
}

/* Used in calculating distance travelled */
    function toRad(value) {
      var RADIANT_CONSTANT = 0.0174532925199433;
      return (value * RADIANT_CONSTANT);
    }



function convertDecimal (input, places) {
        if (isNaN(input)) return input;
        // If we want 1 decimal place, we want to mult/div by 10
        // If we want 2 decimal places, we want to mult/div by 100, etc
        // So use the following to create that factor
        var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
        return Math.round(input * factor) / factor;
    };


var initialPacers = [


{"name":"2","title":"2 hour","laps":[
{"distance":1,"pace":6.5},
{"distance":1,"pace":6.25},
{"distance":1,"pace":6.00},
{"distance":1,"pace":6.5},
{"distance":1,"pace":7.5},
{"distance":1,"pace":6.5},
{"distance":1,"pace":6.75},
{"distance":1,"pace":5.5},
{"distance":1,"pace":5.75},
{"distance":1,"pace":6.00},
{"distance":1,"pace":5.5},
{"distance":1,"pace":5.25},
{"distance":1,"pace":5.5},
{"distance":1,"pace":5.00},
{"distance":1,"pace":5.00},
{"distance":1,"pace":4.75},
{"distance":1,"pace":4.75},
{"distance":1,"pace":5.00},
{"distance":1,"pace":5.25},
{"distance":1,"pace":5.00},
{"distance":1,"pace":4.75},
{"distance":0.1,"pace":5.25}
]},


{"name":"2:15","title":"2 hour 15 minutes","laps":[
{"distance":1,"pace":7.00},
{"distance":1,"pace":6.5},
{"distance":1,"pace":6.25},
{"distance":1,"pace":7.00},
{"distance":1,"pace":8.25},
{"distance":1,"pace":7.50},
{"distance":1,"pace":7.75},
{"distance":1,"pace":6.5},
{"distance":1,"pace":6.25},
{"distance":1,"pace":6.5},
{"distance":1,"pace":6.5},
{"distance":1,"pace":6.00},
{"distance":1,"pace":6.00},
{"distance":1,"pace":6.25},
{"distance":1,"pace":5.75},
{"distance":1,"pace":5.75},
{"distance":1,"pace":5.5},
{"distance":1,"pace":5.75},
{"distance":1,"pace":6.00},
{"distance":1,"pace":5.75},
{"distance":1,"pace":5.5},
{"distance":0.1,"pace":5.25}
]},


{"name":"2:30","title":"2 hour 30 minutes","laps":[
{"distance":1,"pace":7.00},
{"distance":1,"pace":6.50},
{"distance":1,"pace":6.50},
{"distance":1,"pace":7.00},
{"distance":1,"pace":8.50},
{"distance":1,"pace":8.25},
{"distance":1,"pace":8.25},
{"distance":1,"pace":7.50},
{"distance":1,"pace":6.50},
{"distance":1,"pace":7.50},
{"distance":1,"pace":7.25},
{"distance":1,"pace":7.00},
{"distance":1,"pace":6.50},
{"distance":1,"pace":7.00},
{"distance":1,"pace":6.5},
{"distance":1,"pace":6.5},
{"distance":1,"pace":6.5},
{"distance":1,"pace":6.5},
{"distance":1,"pace":6.75},
{"distance":1,"pace":6.75},
{"distance":1,"pace":6.75},
{"distance":0.1,"pace":6.75}
]},

{"name":"2:45","title":"2 hour 45 minutes","laps":[
{"distance":1,"pace":8.25},
{"distance":1,"pace":7.5},
{"distance":1,"pace":7.5},
{"distance":1,"pace":9.25},
{"distance":1,"pace":10.00},
{"distance":1,"pace":9.00},
{"distance":1,"pace":9.00},
{"distance":1,"pace":8.5},
{"distance":1,"pace":7.00},
{"distance":1,"pace":8.5},
{"distance":1,"pace":8.25},
{"distance":1,"pace":7.5},
{"distance":1,"pace":7.00},
{"distance":1,"pace":7.5},
{"distance":1,"pace":6.75},
{"distance":1,"pace":6.75},
{"distance":1,"pace":6.75},
{"distance":1,"pace":6.75},
{"distance":1,"pace":7.75},
{"distance":1,"pace":7.75},
{"distance":1,"pace":7.25},
{"distance":0.1,"pace":6.75}
]},


{"name":"3","title":"3 hour","laps":[
{"distance":1,"pace":8.75},
{"distance":1,"pace":8.00},
{"distance":1,"pace":8.00},
{"distance":1,"pace":10.75},
{"distance":1,"pace":11.00},
{"distance":1,"pace":9.50},
{"distance":1,"pace":9.50},
{"distance":1,"pace":9.50},
{"distance":1,"pace":7.50},
{"distance":1,"pace":9.5},
{"distance":1,"pace":9.25},
{"distance":1,"pace":8.00},
{"distance":1,"pace":7.5},
{"distance":1,"pace":8.00},
{"distance":1,"pace":7.25},
{"distance":1,"pace":7.25},
{"distance":1,"pace":7.25},
{"distance":1,"pace":7.25},
{"distance":1,"pace":8.75},
{"distance":1,"pace":8.75},
{"distance":1,"pace":8.00},
{"distance":0.1,"pace":8.00}
]}

];