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