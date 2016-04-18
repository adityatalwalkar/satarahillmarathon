angular.module('marathonpacers.myruns.controllers', [])

.controller('MyRunsController', function($scope,ionicMaterialInk, ionicMaterialMotion, $ionicSideMenuDelegate, $timeout) {
  
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 1000);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

//alert(moment('2015-06-24 19:57:00', "YYYYMMDD").fromNow()); 
$scope.activeruns = [
    { title: 'Run 1', id: 1, dateTime : moment('2015-06-24 19:57:00', "YYYYMMDD").fromNow(),distance: 10,duration:getDurationString(moment(0).add(Math.random()*100000000,'ms')) },
    { title: 'Chill', id: 2, dateTime : moment('2015-06-24 19:57:00', "YYYYMMDD").fromNow(),distance: 5,duration:getDurationString(moment(0).add(Math.random()*100000000,'ms')) },
    { title: 'Dubstep', id: 3, dateTime : moment('2015-06-24 19:57:00', "YYYYMMDD").fromNow(),distance: 2,duration:getDurationString(moment(0).add(Math.random()*100000000,'ms')) },
    { title: 'Indie', id: 4, dateTime : moment('2015-06-24 19:57:00', "YYYYMMDD").fromNow(),distance: 5,duration:getDurationString(moment(0).add(Math.random()*100000000,'ms')) },
    { title: 'Rap', id: 5, dateTime : moment('2015-06-24 19:57:00', "YYYYMMDD").fromNow(),distance: 3,duration:getDurationString(moment(0).add(Math.random()*100000000,'ms')) },
    { title: 'Cowbell', id: 6, dateTime : moment('2015-06-24 19:57:00', "YYYYMMDD").fromNow(),distance: 15,duration:getDurationString(moment(0).add(Math.random()*100000000,'ms')) }
  ];
});

