/* globals angular, console */
angular.module('marathonpacers.settings.controllers', [])
  .controller('SettingsController', 
    function ($scope, $timeout, $interval, $ionicPlatform, $state) {
      $scope.paces = JSON.parse(window.localStorage['pace'] || '[]');
      $scope.settings = JSON.parse(window.localStorage['settings'] || '{"announcementFrequency": 5,"unit": "Kilometers","announceDistance":true,"announcelapPace":true}');
      $scope.savePaces = function()
      {
        //$scope.paces.push({distance:2,pace:5.5});
        window.localStorage["pace"] = JSON.stringify($scope.paces);
        //$location.path = "home"
        $state.go("app.home");
      };

      $scope.saveSettings = function()
      {
        //$scope.paces.push({distance:2,pace:5.5});
        window.localStorage["settings"] = JSON.stringify($scope.settings);
        $state.go("app.home");
      };
  });