class RunTimer {
  constructor() {
    this.duration = moment.duration(0);
    this.savedTime = new Date().getTime(); 
  }

  tick()
  {
  	    var difference = new Date().getTime() - this.savedTime; 
        this.duration.add(difference, 'ms');
        this.savedTime = new Date().getTime();
        

  }

  durationSeconds()
  {
  	return this.duration.asSeconds();
  }

  durationString() {
  	return getDurationString(this.duration);
  }

  
}