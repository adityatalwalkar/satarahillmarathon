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


function speedToPace(speed) {
    if(speed> 0)
      return 60/speed;
    else
      speed = 0;
}

function calculateSpeed(distance,time) 
{
  var KMS_TO_KMH = 3600;
  if(time == 0) 
      return 0;
  else 
      return (distance / time) * KMS_TO_KMH;
}


function getShortPaceFromDecimal(longTime)
{
  if(!longTime) return "0' 0\"";
  var min = Math.floor(longTime);
  var decimal = longTime - min;
  // 0.50 - 30
  var secs = Math.floor(decimal * 60);
  if(secs >= 10)
      return min + "' " + secs + "\"";
  else
      return min + "' 0" + secs + "\"";
}

function getDecimalFromShort(longTime)
{
  var min = Math.floor(longTime);
  var decimal = longTime - min;
  // 0.50 - 30
  var secs = Math.floor(decimal * 6/10);
  return  parse(min+"." + secs);
}

function toTimeString(sec_num) {

    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var message = "";
    seconds = Math.floor(seconds);

    if(hours > 0 )
      message = hours+' hours ';
    if(minutes > 0 )
      message += minutes+' minutes ';
    if(seconds > 0 )
      message += seconds +' seconds ';
    
    return message;
    
}

function distancetoLongString(difference)
{
      //var difference = pacer.distance - $scope.session.distance;
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
        return distanceMessage;
}


var positions = [{coords:{latitude:12.931039, longitude:77.686632},speed:10},
{coords:{latitude:12.934594, longitude:77.690580},speed:10},
{coords:{latitude:12.937556, longitude:77.693695},speed:10}
];

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