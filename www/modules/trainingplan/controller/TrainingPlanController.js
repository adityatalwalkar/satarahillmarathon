angular.module('marathonpacers.trainingplan.controllers', [])

.controller('TrainingPlanController', function($scope,$firebaseObject,FURL,Auth) {

  $scope.activeruns = [
    { title: 'Home 1', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

